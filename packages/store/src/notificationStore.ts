import { create } from 'zustand'
import { NotifItem, NotifType } from '@medicare-pro/types'

interface NotificationState {
  items: NotifItem[]
  unreadCount: number
  add: (item: Omit<NotifItem, 'id' | 'timestamp' | 'read'>) => void
  markRead: (id: string) => void
  markAllRead: () => void
}

const SEED: NotifItem[] = [
  { id: 'n1', type: 'critical',    title: 'Critical Alert',       body: 'David Patel: SpO2 dropped to 88%. Vent settings adjusted.',        timestamp: new Date(Date.now() - 2 * 60000),   read: false, patientId: 'p-006' },
  { id: 'n2', type: 'critical',    title: 'Critical Alert',       body: 'Robert Chen: BP 88/55 mmHg. Vasopressor initiated.',               timestamp: new Date(Date.now() - 15 * 60000),  read: false, patientId: 'p-002' },
  { id: 'n3', type: 'admission',   title: 'New Admission',        body: 'Thomas Murphy admitted to Ward 3B, Bed 318. Gastroenterology.',    timestamp: new Date(Date.now() - 60 * 60000),  read: true,  patientId: 'p-008' },
  { id: 'n4', type: 'appointment', title: 'Appointment Reminder', body: 'Sarah Mitchell follow-up with Dr. Harrington in 30 minutes.',      timestamp: new Date(Date.now() - 2 * 3600000), read: true,  patientId: 'p-001' },
  { id: 'n5', type: 'lab',         title: 'Lab Results Ready',    body: 'Natasha Williams: Chemotherapy panel results uploaded to chart.',  timestamp: new Date(Date.now() - 3 * 3600000), read: true,  patientId: 'p-007' },
  { id: 'n6', type: 'discharge',   title: 'Discharge Confirmed',  body: 'Emily Thornton discharged from Ward 1A. Follow-up in 2 weeks.',   timestamp: new Date(Date.now() - 5 * 3600000), read: true,  patientId: 'p-005' },
]

export const useNotificationStore = create<NotificationState>()((set, get) => ({
  items: SEED,
  unreadCount: SEED.filter((n) => !n.read).length,

  add: (item) => {
    const n: NotifItem = { ...item, id: `n-${Date.now()}`, timestamp: new Date(), read: false }
    const items = [n, ...get().items]
    set({ items, unreadCount: items.filter((x) => !x.read).length })
  },

  markRead: (id) => {
    const items = get().items.map((n) => (n.id === id ? { ...n, read: true } : n))
    set({ items, unreadCount: items.filter((x) => !x.read).length })
  },

  markAllRead: () => {
    const items = get().items.map((n) => ({ ...n, read: true }))
    set({ items, unreadCount: 0 })
  },
}))
