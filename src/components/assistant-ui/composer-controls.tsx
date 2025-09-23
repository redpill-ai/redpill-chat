"use client";

import { ChevronDownIcon, ShieldCheckIcon, Sparkles } from "lucide-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { ModelSelector } from "@/components/model-selector";
import { Button } from "@/components/ui/button";
import { useChatLayout } from "@/hooks/use-chat-layout";
import { useChatSettings } from "@/hooks/use-chat-settings";
import { getModelProviderIcon } from "@/lib/utils";
import { useModelsStore } from "@/state/models";

export const ComposerControls: FC = () => {
  const model = useChatSettings((state) => state.model);
  const setModel = useChatSettings((state) => state.setModel);
  const { toggleRightPanel } = useChatLayout();
  const models = useModelsStore((state) => state.models);
  const [isModelDialogOpen, setIsModelDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsModelDialogOpen(!isModelDialogOpen);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModelDialogOpen]);

  const modelOptions = models.map((m) => {
    // Extract provider from model name (e.g., "Meta: Llama 3.3 70B Instruct" -> "Meta")
    const providerFromName =
      m.name.split(":")[0]?.trim() || m.providers[0] || "unknown";

    return {
      value: m.id,
      label: m.name,
      provider: providerFromName,
      iconUrl: getModelProviderIcon(providerFromName),
    };
  });

  // Auto-select first model if none is selected
  const activeOption =
    modelOptions.find((option) => option.value === model) ?? modelOptions[0];

  // Set default model when models are loaded and no model is selected
  if (!model && modelOptions.length > 0) {
    setModel(modelOptions[0].value);
  }

  return (
    <>
      <div className="aui-composer-controls flex flex-wrap items-center justify-start gap-2 px-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="aui-composer-model-trigger inline-flex items-center gap-2 rounded-full"
          aria-label="Select model"
          onClick={() => setIsModelDialogOpen(true)}
        >
          {activeOption?.iconUrl ? (
            <div className="size-4 flex items-center justify-center rounded-sm overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeOption.iconUrl}
                alt={activeOption.provider}
                className="size-full object-contain"
              />
            </div>
          ) : (
            <Sparkles className="size-4 text-primary" aria-hidden />
          )}
          <span className="text-sm font-semibold text-foreground">
            {activeOption?.label || "Select model"}
          </span>
          <div className="ml-auto flex items-center gap-1">
            <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-0.5 rounded border bg-muted px-1 font-mono text-[9px] font-medium text-muted-foreground opacity-100">
              <span className="text-[8px]">⌘</span>K
            </kbd>
            <ChevronDownIcon
              className="size-4 text-muted-foreground"
              aria-hidden
            />
          </div>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="aui-composer-verifier-trigger inline-flex items-center gap-2 rounded-full"
          onClick={() => toggleRightPanel("verifier")}
          aria-label="Open verifier sidebar"
        >
          <ShieldCheckIcon className="size-4 text-primary" aria-hidden />
          <span className="text-sm font-semibold">Chat is private</span>
        </Button>
      </div>

      <ModelSelector
        open={isModelDialogOpen}
        onOpenChange={setIsModelDialogOpen}
      />
    </>
  );
};
