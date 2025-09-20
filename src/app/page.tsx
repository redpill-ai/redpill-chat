'use client'

import { AssistantRuntimeProvider } from '@assistant-ui/react'
import { useChatRuntime } from '@assistant-ui/react-ai-sdk'

import { LeftSidebar } from '@/components/left-sidebar'
import { RightSidebar } from '@/components/right-sidebar'
import { Header } from '@/components/header'
import { Thread } from '@/components/assistant-ui/thread'
import { RIGHT_PANEL_WIDTH, SIDEBAR_WIDTH } from '@/constants'
import { useChatLayout } from '@/hooks/use-chat-layout'

export default function Home() {
  const runtime = useChatRuntime({
    api: '/api/chat',
  })

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
  } = useChatLayout()

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className='relative flex h-screen overflow-hidden bg-background text-foreground'>
        {shouldShowOverlay ? (
          <div
            aria-hidden
            className='fixed inset-0 z-20 bg-background/70 backdrop-blur-sm transition-opacity duration-300'
            onClick={() => {
              setIsSidebarOpen(false)
              closeRightPanel()
            }}
          />
        ) : null}

        <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main
          className='relative flex min-w-0 flex-1 flex-col overflow-hidden transition-[margin] duration-250 ease-in-out'
          style={{
            marginLeft: !isCompactLayout && isSidebarOpen ? SIDEBAR_WIDTH : 0,
            marginRight: !isCompactLayout && isRightPanelVisible ? RIGHT_PANEL_WIDTH : 0,
          }}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
            activeRightPanel={activeRightPanel}
            onToggleSettings={() => toggleRightPanel('settings')}
            onToggleVerifier={() => toggleRightPanel('verifier')}
          />
          <Thread />
        </main>

        <RightSidebar activePanel={activeRightPanel} onClose={closeRightPanel} />
      </div>
    </AssistantRuntimeProvider>
  )
}
