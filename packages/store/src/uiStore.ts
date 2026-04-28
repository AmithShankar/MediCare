import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ViewMode, ToastMessage } from '@medicare-pro/types'

interface UIState {
  headerTitle: string
  headerSubtitle?: string
  viewMode: ViewMode
  sidebarOpen: boolean
  toasts: ToastMessage[]

  setHeader: (title: string, subtitle?: string) => void
  setViewMode: (mode: ViewMode) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  addToast: (toast: Omit<ToastMessage, 'id'>) => void
  removeToast: (id: string) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      headerTitle: 'Dashboard',
      headerSubtitle: '',
      viewMode: 'grid',
      sidebarOpen: true,
      toasts: [],

      setHeader: (headerTitle, headerSubtitle) => set({ headerTitle, headerSubtitle }),

      setViewMode: (viewMode) => set({ viewMode }),

      toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),

      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

      addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
        set({ toasts: [...get().toasts, { ...toast, id }] })
        setTimeout(() => get().removeToast(id), 5000)
      },

      removeToast: (id) =>
        set({ toasts: get().toasts.filter((t) => t.id !== id) }),
    }),
    {
      name: 'hc-ui',
      partialize: (s) => ({ viewMode: s.viewMode, sidebarOpen: s.sidebarOpen }),
    }
  )
)
