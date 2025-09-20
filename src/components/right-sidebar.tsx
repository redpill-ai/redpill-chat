import type { FC } from 'react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { RIGHT_PANEL_WIDTH } from '@/constants'

import type { RightPanel as RightPanelType } from '@/types/layout'

interface RightSidebarProps {
  activePanel: RightPanelType
  onClose: () => void
}

export const RightSidebar: FC<RightSidebarProps> = ({ activePanel, onClose }) => {
  const isVisible = activePanel !== null

  return (
    <aside
      className={cn(
        'fixed inset-y-0 right-0 z-30 flex w-[90vw] max-w-[345px] flex-col border-l border-border bg-muted px-3 py-3 text-sm transition-transform duration-250 ease-in-out sm:px-4 sm:py-4',
        isVisible ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none',
      )}
      aria-hidden={!isVisible}
      style={{ maxWidth: RIGHT_PANEL_WIDTH }}
    >
      <div className='flex items-center justify-between gap-2 text-foreground'>
        <h2 className='text-base font-semibold'>
          {activePanel === 'settings'
            ? 'Settings Sidebar'
            : activePanel === 'verifier'
              ? 'Verifier Sidebar'
              : 'Panels'}
        </h2>
        <Button size='icon' variant='ghost' aria-label='Close right sidebar' onClick={onClose}>
          <X className='size-4' />
        </Button>
      </div>

      {activePanel === 'settings' ? (
        <aside className='mt-6 rounded-lg border border-border bg-card p-4'>
          <p className='text-sm text-muted-foreground'>Configuration placeholder for model, persona, and runtime toggles.</p>
        </aside>
      ) : null}

      {activePanel === 'verifier' ? (
        <aside className='mt-4 rounded-lg border border-border bg-card p-4'>
          <p className='text-sm text-muted-foreground'>Verification pipeline placeholder and validation state summary.</p>
        </aside>
      ) : null}

      {!activePanel ? (
        <div className='mt-6 rounded-lg border border-dashed border-border/60 p-4 text-sm text-muted-foreground'>
          <span className='hidden lg:inline'>Use the toolbar buttons to open settings or verifier panels.</span>
          <span className='lg:hidden'>Use the header controls to open a panel.</span>
        </div>
      ) : null}
    </aside>
  )
}
