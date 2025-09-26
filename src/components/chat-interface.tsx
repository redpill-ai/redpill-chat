"use client";

import {
  AssistantRuntimeProvider,
  type ChatModelAdapter,
  type ChatModelRunResult,
  useLocalRuntime,
} from "@assistant-ui/react";
import { useEffect, useMemo } from "react";
import { Thread } from "@/components/assistant-ui/thread";
import { Header } from "@/components/header";
import { LeftSidebar } from "@/components/left-sidebar";
import { SettingSidebar } from "@/components/setting-sidebar";
import { VerifierSidebar } from "@/components/verifier-sidebar";
import { RIGHT_PANEL_WIDTH, SIDEBAR_WIDTH } from "@/constants";
import { useChatLayout } from "@/hooks/use-chat-layout";
import { useChatSettings } from "@/hooks/use-chat-settings";
import { createOpenAICompatibleAdapter } from "@/lib/openai-compatible-adapter";
import { useModelsStore } from "@/state/models";
import type { Model } from "@/types/model";
import { env } from "@/env";
import { UrlHashMessageHandler } from "@/components/url-hash-message-handler";

function isAsyncIterable<T>(value: unknown): value is AsyncIterable<T> {
  return (
    typeof value === "object" && value !== null && Symbol.asyncIterator in value
  );
}

interface ChatInterfaceProps {
  models: Model[];
}

export function ChatInterface({ models }: ChatInterfaceProps) {
  const messagesInContext = useChatSettings((state) => state.messagesInContext);
  const responseLanguage = useChatSettings((state) => state.responseLanguage);
  const model = useChatSettings((state) => state.model);
  const setModels = useModelsStore((state) => state.setModels);

  useEffect(() => {
    setModels(models);
  }, [models, setModels]);

  useEffect(() => {
    if (!env.NEXT_PUBLIC_REDPILL_API_KEY) {
      console.warn(
        "NEXT_PUBLIC_REDPILL_API_KEY is not set; chat requests will fail.",
      );
    }
  }, []);

  const baseAdapter = useMemo<ChatModelAdapter>(
    () => createOpenAICompatibleAdapter({ model: model || undefined }),
    [model],
  );

  const chatModelAdapter = useMemo<ChatModelAdapter>(
    () => ({
      async *run(args) {
        const { messages, context, config, ...rest } = args;

        const limitedMessages =
          typeof messagesInContext === "number" &&
          messagesInContext > 0 &&
          messages.length > messagesInContext
            ? messages.slice(-messagesInContext)
            : messages;

        const systemSegments: string[] = [];
        if (
          typeof context.system === "string" &&
          context.system.trim().length > 0
        ) {
          systemSegments.push(context.system.trim());
        }
        if (responseLanguage) {
          systemSegments.push(`Always respond in ${responseLanguage}.`);
        }

        const systemPrompt =
          systemSegments.length > 0
            ? systemSegments.join("\n\n")
            : context.system;

        const nextContext = {
          ...context,
          system: systemPrompt,
        };

        const nextConfig = {
          ...config,
          system: systemPrompt,
        };

        const result = baseAdapter.run({
          ...rest,
          context: nextContext,
          config: nextConfig,
          messages: limitedMessages,
        });

        if (isAsyncIterable<ChatModelRunResult>(result)) {
          for await (const chunk of result) {
            yield chunk;
          }
        } else {
          const resolved = await result;
          if (resolved) {
            yield resolved;
          }
        }
      },
    }),
    [baseAdapter, messagesInContext, responseLanguage],
  );

  const runtime = useLocalRuntime(chatModelAdapter);

  const {
    isCompactLayout,
    isSidebarOpen,
    activeRightPanel,
    isRightPanelVisible,
    shouldShowOverlay,
    setIsSidebarOpen,
    toggleSidebar,
    toggleRightPanel,
    closeRightPanel,
  } = useChatLayout();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <UrlHashMessageHandler />
      <div className="relative flex h-screen overflow-hidden bg-background text-foreground">
        {shouldShowOverlay ? (
          <div
            aria-hidden
            className="fixed inset-0 z-20 bg-background/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => {
              setIsSidebarOpen(false);
              closeRightPanel();
            }}
          />
        ) : null}

        <LeftSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main
          className="relative flex min-w-0 flex-1 flex-col overflow-hidden transition-[margin] duration-250 ease-in-out"
          style={{
            marginLeft: !isCompactLayout && isSidebarOpen ? SIDEBAR_WIDTH : 0,
            marginRight:
              !isCompactLayout && isRightPanelVisible ? RIGHT_PANEL_WIDTH : 0,
          }}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
            activeRightPanel={activeRightPanel}
            onToggleSettings={() => toggleRightPanel("settings")}
            onToggleVerifier={() => toggleRightPanel("verifier")}
          />
          <Thread />
        </main>

        <SettingSidebar
          isVisible={activeRightPanel === "settings"}
          onClose={closeRightPanel}
        />
        <VerifierSidebar
          isVisible={activeRightPanel === "verifier"}
          onClose={closeRightPanel}
        />
      </div>
    </AssistantRuntimeProvider>
  );
}
