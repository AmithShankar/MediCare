'use client'

import { useState, useEffect } from 'react'
import { 
  Bell, CheckCircle2, AlertTriangle, Clock, UserPlus, 
  FlaskConical, UserCheck, Settings as SettingsIcon, Trash2, Check
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@medicare-pro/ui'
import { useNotifications } from '@medicare-pro/hooks'
import { useUIStore } from '@medicare-pro/store'
import { cn } from '@medicare-pro/utils'

import { NotifType, DemoNotif } from '@medicare-pro/types'

const DEMO_NOTIFICATIONS: DemoNotif[] = [
  { id: '1', type: 'critical',    title: 'Critical Alert',        message: 'David Patel: SpO2 dropped below 90%',                    time: '2 min ago',  read: false },
  { id: '2', type: 'critical',    title: 'Critical Alert',        message: 'Robert Chen: Blood pressure critically low (88/55)',      time: '15 min ago', read: false },
  { id: '3', type: 'admission',   title: 'New Admission',         message: 'Thomas Murphy admitted to Ward 3B, Bed 318',             time: '1 hr ago',   read: true  },
  { id: '4', type: 'appointment', title: 'Appointment Reminder',  message: 'Sarah Mitchell: follow-up in 30 minutes',               time: '2 hr ago',   read: true  },
  { id: '5', type: 'success',     title: 'Discharge Confirmed',   message: 'Emily Thornton successfully discharged from Ward 1A',   time: '3 hr ago',   read: true  },
  { id: '6', type: 'lab',         title: 'Lab Results Ready',     message: 'Natasha Williams: Chemotherapy panel results available', time: '4 hr ago',   read: true  },
]

const NOTIF_ICONS: Record<NotifType, any> = {
  critical:    AlertTriangle,
  admission:   UserPlus,
  appointment: Clock,
  success:     UserCheck,
  lab:         FlaskConical,
  discharge:   UserCheck,
}

const NOTIF_STYLES: Record<NotifType, { icon: string, dot: string }> = {
  critical:    { icon: 'text-destructive bg-destructive/10', dot: 'bg-destructive' },
  admission:   { icon: 'text-primary bg-primary/10', dot: 'bg-primary' },
  appointment: { icon: 'text-amber-600 bg-amber-500/10', dot: 'bg-amber-500' },
  success:     { icon: 'text-emerald-600 bg-emerald-500/10', dot: 'bg-emerald-500' },
  lab:         { icon: 'text-violet-600 bg-violet-500/10', dot: 'bg-violet-500' },
  discharge:   { icon: 'text-emerald-600 bg-emerald-500/10', dot: 'bg-emerald-500' },
}

export function NotificationsClient() {
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const { requestPermission, notifyCriticalAlert } = useNotifications()
  const addToast = useUIStore((s) => s.addToast)
  const setHeader = useUIStore((s) => s.setHeader)

  useEffect(() => {
    setHeader('Notifications', 'Monitor real-time system alerts and clinical updates')
  }, [setHeader])

  // Fire 1 push notification when visiting this page if there are unread critical alerts
  useEffect(() => {
    const unread = DEMO_NOTIFICATIONS.filter((n) => !n.read && n.type === 'critical')
    if (unread.length === 0) return
    requestPermission().then((granted) => {
      if (!granted) return
      notifyCriticalAlert(
        `${unread.length} unread critical alert${unread.length > 1 ? 's' : ''}`,
        unread[0].message
      )
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications
  const unreadCount = notifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((n) => n.map((item) => ({ ...item, read: true })))
    addToast({ type: 'success', title: 'Success', message: 'All notifications marked as read' })
  }

  function markRead(id: string) {
    setNotifications((prev) => prev.map((item) => item.id === id ? { ...item, read: true } : item))
  }

  function deleteNotif(id: string) {
    setNotifications((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-reveal">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 premium-card p-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={cn(
              'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all',
              filter === 'all' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-accent'
            )}
          >
            All Notifications
          </button>
          <button 
            onClick={() => setFilter('unread')}
            className={cn(
              'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2',
              filter === 'unread' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-accent'
            )}
          >
            Unread
            {unreadCount > 0 && <span className="h-4 min-w-4 flex items-center justify-center bg-destructive text-white rounded-full text-[9px]">{unreadCount}</span>}
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllRead} className="h-9 px-4 rounded-xl border-border text-xs font-bold uppercase tracking-wider">
            <Check className="h-3.5 w-3.5 mr-2" />
            Mark all read
          </Button>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-xl border-border">
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((n, i) => {
              const Icon = NOTIF_ICONS[n.type]
              const style = NOTIF_STYLES[n.type]
              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    'group relative flex items-start gap-4 p-5 premium-card transition-all duration-300',
                    n.read ? 'opacity-70 grayscale-[0.5]' : 'border-l-4 border-l-primary'
                  )}
                >
                  <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner', style.icon)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0 pr-10">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={cn('text-sm font-bold tracking-tight', n.read ? 'text-foreground/80' : 'text-foreground')}>
                        {n.title}
                      </h3>
                      {!n.read && <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse', style.dot)} />}
                      <span className="text-[10px] font-medium text-muted-foreground/60 ml-auto">{n.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {n.message}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => markRead(n.id)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                      title="Mark as read"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteNotif(n.id)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center mb-6">
                <Bell className="h-10 w-10 text-muted-foreground/40" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No notifications found</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-[240px]">
                You're all caught up! New alerts will appear here.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
