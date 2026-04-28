import type { Metadata } from 'next'
import { NotificationsClient } from '@/features/notifications/NotificationsClient'

export const metadata: Metadata = { 
  title: 'Notifications',
  description: 'Clinical alerts and system updates.'
}

export default function NotificationsPage() {
  return (
    <div className="p-4 lg:p-8">
      <NotificationsClient />
    </div>
  )
}
