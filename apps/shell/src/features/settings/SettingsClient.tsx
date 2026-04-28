'use client'

import { useState, useEffect } from 'react'
import { 
  User, Bell, Shield, Globe, ChevronRight, Key, Eye, LogOut,
  Mail, Building, AlertTriangle, UserPlus, FlaskConical, UserCheck
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Avatar, Button, Badge, Switch } from '@medicare-pro/ui'
import { useAuth } from '@medicare-pro/hooks'
import { useUIStore } from '@medicare-pro/store'
import { cn } from '@medicare-pro/utils'

import { SettingsSection } from '@medicare-pro/types'

export function SettingsClient() {
  const { user, logout } = useAuth()
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile')
  const setHeader = useUIStore((s) => s.setHeader)

  useEffect(() => {
    setHeader('Settings', 'Manage clinical profile and security preferences')
  }, [setHeader])

  const SECTIONS = [
    { id: 'profile', label: 'Profile', icon: User, desc: 'Manage your personal clinical profile' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Configure how you receive alerts' },
    { id: 'security', label: 'Security', icon: Shield, desc: 'Password and access controls' },
    { id: 'preferences', label: 'System', icon: Globe, desc: 'Language and regional settings' },
  ]

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 animate-reveal">
      <div className="lg:w-72 shrink-0 space-y-1">
        <h2 className="px-4 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
          Account Settings
        </h2>
        {SECTIONS.map((section) => {
          const Icon = section.icon
          const active = activeSection === section.id
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as SettingsSection)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all group',
                active 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5', active ? 'text-white' : 'text-muted-foreground group-hover:text-foreground')} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold tracking-tight">{section.label}</p>
                <p className={cn('text-[10px] truncate', active ? 'text-white/70' : 'text-muted-foreground/60')}>
                  {section.desc}
                </p>
              </div>
              {active && <ChevronRight className="h-4 w-4 text-white/50" />}
            </button>
          )
        })}
        
        <div className="pt-6 border-t border-border mt-4">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-destructive hover:bg-destructive/5 transition-all group"
          >
            <LogOut className="h-5 w-5" />
            <p className="text-sm font-bold tracking-tight">Sign Out</p>
          </button>
        </div>
      </div>

      <div className="flex-1 min-w-0 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {activeSection === 'profile' && (
              <>
                <div className="premium-card p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="relative group">
                      <Avatar name={user?.displayName ?? user?.email ?? 'U'} src={user?.photoURL} size="xl" className="ring-4 ring-primary/10" />
                      <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Change</span>
                      </button>
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-2xl font-display font-bold text-foreground">
                        {user?.displayName ?? 'Healthcare Clinician'}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                        <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {user?.email}</span>
                        <div className="h-1 w-1 rounded-full bg-border" />
                        <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Senior Admin</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Badge variant="green" className="px-3">Active Now</Badge>
                        <Badge variant="blue" className="px-3">Verified Faculty</Badge>
                      </div>
                    </div>
                    <Button className="rounded-xl px-6 font-bold tracking-tight">
                      Save Changes
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card title="Personal Information" subtitle="Update your contact and identification details">
                    <div className="space-y-4 pt-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
                        <input className="w-full h-10 rounded-xl border border-border bg-background px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" defaultValue={user?.displayName ?? ''} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Clinical ID</label>
                        <input className="w-full h-10 rounded-xl border border-border bg-accent/30 px-4 text-sm focus:outline-none" defaultValue="CP-10294-A" readOnly />
                      </div>
                    </div>
                  </Card>
                  <Card title="Department Details" subtitle="Your organizational unit and office location">
                    <div className="space-y-4 pt-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Organization</label>
                        <div className="flex items-center gap-3 h-10 rounded-xl border border-border bg-accent/10 px-4 text-sm font-medium">
                          <Building className="h-4 w-4 text-primary" /> St. Mary's General
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Specialization</label>
                        <input className="w-full h-10 rounded-xl border border-border bg-background px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none" defaultValue="Critical Care Oncology" />
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            )}

            {activeSection === 'notifications' && (
              <Card title="Global Alert Preferences" subtitle="Control which events trigger system and browser notifications">
                <div className="space-y-1 pt-4">
                  {[
                    { label: 'Critical patient vital changes', desc: 'Fires immediately when vitals cross thresholds', icon: AlertTriangle, color: 'text-destructive' },
                    { label: 'New patient admissions', desc: 'Notify when a new patient is assigned to you', icon: UserPlus, color: 'text-primary' },
                    { label: 'Laboratory results ready', desc: 'When test results are published to the system', icon: FlaskConical, color: 'text-violet-500' },
                    { label: 'Discharge approvals', desc: 'Notification when a patient is cleared for discharge', icon: UserCheck, color: 'text-emerald-500' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-4 border-b border-border last:border-0 transition-all hover:bg-accent/20 px-2 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className={cn('h-10 w-10 rounded-xl bg-accent flex items-center justify-center shrink-0', item.color)}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground/70">{item.desc}</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeSection === 'security' && (
              <div className="grid md:grid-cols-2 gap-6">
                <Card title="Authentication" subtitle="Update your password and 2FA settings">
                  <div className="space-y-4 pt-4">
                    <Button variant="outline" className="w-full justify-between h-12 rounded-xl border-border font-bold group">
                      <span className="flex items-center gap-3"><Key className="h-4 w-4" /> Change Password</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between h-12 rounded-xl border-border font-bold group">
                      <span className="flex items-center gap-3"><Shield className="h-4 w-4" /> Multi-factor Auth</span>
                      <Badge variant="blue">Enabled</Badge>
                    </Button>
                  </div>
                </Card>
                <Card title="Privacy & Access" subtitle="Manage account visibility and audit logs">
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-bold text-foreground">Hide active status</span>
                      </div>
                      <Switch />
                    </div>
                    <Button variant="outline" className="w-full h-11 rounded-xl border-border font-bold">
                      View Login Audit Logs
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
