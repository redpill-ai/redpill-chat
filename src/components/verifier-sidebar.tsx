'use client'

import type { FC } from 'react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { RIGHT_PANEL_WIDTH } from '@/constants'

interface VerifierSidebarProps {
  isVisible: boolean
  onClose: () => void
}

export const VerifierSidebar: FC<VerifierSidebarProps> = ({ isVisible, onClose }) => {
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
        <h2 className='text-base font-semibold'>Verifier Sidebar</h2>
        <Button size='icon' variant='ghost' aria-label='Close verifier sidebar' onClick={onClose}>
          <X className='size-4' />
        </Button>
      </div>

      <section className='mt-4 rounded-lg border border-border bg-card p-4'>
        <p className='text-sm text-muted-foreground'>Verification pipeline placeholder and validation state summary.</p>
      </section>
    </aside>
  )
}
