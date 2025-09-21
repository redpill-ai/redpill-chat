import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type ThemeOption = 'light' | 'dark'

interface ChatSettingsState {
  theme: ThemeOption
  messagesInContext: number
  responseLanguage: string
  setTheme: (theme: ThemeOption) => void
  setMessagesInContext: (count: number) => void
  setResponseLanguage: (language: string) => void
}

const fallbackStorage: Storage = {
  length: 0,
  clear: () => {},
  getItem: () => null,
  key: () => null,
  removeItem: () => {},
  setItem: () => {},
}

export const useChatSettings = create<ChatSettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      messagesInContext: 15,
      responseLanguage: 'English',
      setTheme: (theme) => set({ theme }),
      setMessagesInContext: (count) =>
        set({ messagesInContext: Math.min(Math.max(count, 1), 50) }),
      setResponseLanguage: (language) => set({ responseLanguage: language }),
    }),
    {
      name: 'redpill-chat-settings',
      storage: createJSONStorage(() =>
        typeof window === 'undefined' ? fallbackStorage : window.localStorage,
      ),
    },
  ),
)

export type { ThemeOption }
