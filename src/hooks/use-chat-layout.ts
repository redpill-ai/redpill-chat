import { useCallback, useEffect, useMemo, useState } from 'react'

import { LAYOUT_COMPACT_MEDIA_QUERY } from '@/constants'
import type { RightPanel } from '@/types/layout'

export function useChatLayout() {
  const [isCompactLayout, setIsCompactLayout] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeRightPanel, setActiveRightPanel] = useState<RightPanel>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(LAYOUT_COMPACT_MEDIA_QUERY)
    const updateLayout = (matches: boolean) => setIsCompactLayout(matches)

    updateLayout(mediaQuery.matches)

    const listener = (event: MediaQueryListEvent) => updateLayout(event.matches)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', listener)
    } else {
      mediaQuery.addListener(listener)
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', listener)
      } else {
        mediaQuery.removeListener(listener)
      }
    }
  }, [])

  const isRightPanelVisible = activeRightPanel !== null

  const shouldShowOverlay = useMemo(
    () => isCompactLayout && (isSidebarOpen || isRightPanelVisible),
    [isCompactLayout, isRightPanelVisible, isSidebarOpen],
  )

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((previous) => {
      const next = !previous
      if (next && isCompactLayout && isRightPanelVisible) {
        setActiveRightPanel(null)
      }
      return next
    })
  }, [isCompactLayout, isRightPanelVisible])

  const toggleRightPanel = useCallback(
    (panel: Exclude<RightPanel, null>) => {
      setActiveRightPanel((previous) => {
        if (previous === panel) {
          return null
        }

        if (isCompactLayout) {
          setIsSidebarOpen(false)
        }

        return panel
      })
    },
    [isCompactLayout],
  )

  const closeRightPanel = useCallback(() => {
    setActiveRightPanel(null)
  }, [])

  return {
    isCompactLayout,
    isSidebarOpen,
    activeRightPanel,
    isRightPanelVisible,
    shouldShowOverlay,
    setIsSidebarOpen,
    toggleSidebar,
    toggleRightPanel,
    closeRightPanel,
  }
}
