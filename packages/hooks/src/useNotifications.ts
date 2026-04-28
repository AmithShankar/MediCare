import { useNotificationStore } from '@medicare-pro/store'

export function useNotifications() {
  const { items, unreadCount, add, markRead, markAllRead } = useNotificationStore()

  async function requestPermission() {
    if (typeof window === 'undefined' || !('Notification' in window)) return false
    const status = await Notification.requestPermission()
    return status === 'granted'
  }

  function notifyCriticalAlert(title: string, body: string) {
    if (typeof window === 'undefined' || !('Notification' in window) || Notification.permission !== 'granted') return
    new Notification(title, { body })
  }

  return {
    notifications: items,
    unreadCount,
    addNotification: add,
    markAsRead: markRead,
    markAllAsRead: markAllRead,
    requestPermission,
    notifyCriticalAlert
  }
}
