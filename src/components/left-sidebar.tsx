'use client'

import Image from 'next/image'
import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { LogOut, UserRound, X } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import { SIDEBAR_WIDTH } from '@/constants'

interface LeftSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const FALLBACK_AVATAR = 'RP'

const getInitials = (value: string) => {
  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

const normalizeUrl = (url: string | undefined) => {
  if (!url) return ''
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export const LeftSidebar: FC<LeftSidebarProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, isLoading, logout } = useAuth()

  const baseWebUrl = normalizeUrl(process.env.NEXT_PUBLIC_WEB_URL)
  const loginBaseHref = baseWebUrl ? `${baseWebUrl}/login` : '/login'
  const [loginHref, setLoginHref] = useState(loginBaseHref)

  useEffect(() => {
    if (!baseWebUrl || typeof window === 'undefined') {
      return
    }

    const currentUrl = window.location.href
    setLoginHref(`${baseWebUrl}/login?returnUrl=${encodeURIComponent(currentUrl)}`)
  }, [baseWebUrl])

  const displayName = user?.name || user?.email || 'Account'
  const initials = useMemo(() => getInitials(displayName) || FALLBACK_AVATAR, [displayName])

  const brandHref = baseWebUrl || '/'

  const handleLogout = () => {
    void logout()
  }

  const userMenu = isAuthenticated && user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full border border-border/50'>
          <Avatar className='size-9'>
            <AvatarImage src={user.image ?? undefined} alt={displayName} />
            <AvatarFallback>{initials || FALLBACK_AVATAR}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <div className='px-2 py-1.5 text-sm'>
          <p className='font-semibold text-foreground'>{displayName}</p>
          <p className='mt-0.5 truncate text-xs text-muted-foreground'>{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='gap-2'
          onSelect={(event) => {
            event.preventDefault()
            handleLogout()
          }}
        >
          <LogOut className='size-4' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null

  const showLoadingState = isLoading && !isAuthenticated

  const headerAccountSlot = showLoadingState ? <Skeleton className='size-9 rounded-full' /> : userMenu

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
        <a href={brandHref} aria-label='Redpill home' className='flex items-center gap-2'>
          <Image src='/logo-full.svg' alt='Redpill' width={120} height={32} priority />
        </a>
        <div className='flex items-center gap-2'>
          {headerAccountSlot}
          <Button size='icon' variant='ghost' aria-label='Collapse sidebar' onClick={onClose}>
            <X className='size-4' />
          </Button>
        </div>
      </div>
      <div className='mt-6'>
        {isAuthenticated && user ? null : showLoadingState ? null : (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>Sign in to unlock full features and sync your workspace.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <Button asChild className='w-full'>
                <a href={loginHref} className='flex items-center justify-center gap-2'>
                  <UserRound className='size-4' />
                  Sign in
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
        <ThreadList />
      </div>
    </aside>
  )
}
