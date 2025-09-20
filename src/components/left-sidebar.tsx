import type { FC } from 'react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SIDEBAR_WIDTH } from '@/constants'

interface LeftSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const LeftSidebar: FC<LeftSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 flex w-[85vw] max-w-[300px] flex-col border-r border-border bg-card px-3 py-3 text-sm text-muted-foreground transition-transform duration-250 ease-in-out sm:px-4 sm:py-4',
        isOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-full opacity-0 pointer-events-none',
      )}
      aria-hidden={!isOpen}
      style={{ maxWidth: SIDEBAR_WIDTH }}
    >
      <div className='flex items-center justify-between gap-2 text-foreground'>
        <h2 className='text-base font-semibold'>Sidebar</h2>
        <Button size='icon' variant='ghost' aria-label='Collapse sidebar' onClick={onClose}>
          <X className='size-4' />
        </Button>
      </div>
      <p className='mt-6 leading-relaxed'>Primary navigation placeholder for upcoming chat tools.</p>
      <div className='mt-4 rounded-md border border-dashed border-border/60 bg-background px-3 py-2 text-xs text-muted-foreground'>
        <span className='hidden lg:inline'>Collapse this panel with the toggle in the toolbar to mirror tinfoil-chat&apos;s behavior.</span>
        <span className='lg:hidden'>Tap outside this panel to close it on compact layouts.</span>
      </div>
    </aside>
  )
}
