'use client'

import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { ToastContainer } from '../Toast'
import { useUIStore, useAuthStore } from '@medicare-pro/store'
import { Heart } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

function LogoutLoader() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xl"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="h-20 w-20 rounded-3xl border-4 border-primary/20 border-t-primary animate-spin shadow-2xl shadow-primary/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="h-8 w-8 text-primary fill-primary/20 animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-display font-black text-white tracking-tight">Signing Out</p>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Securing your clinical session</p>
        </div>
      </div>
    </motion.div>
  )
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { headerTitle, headerSubtitle } = useUIStore()
  const { isLoading, user } = useAuthStore()

  // Only show logout loader if we were logged in and now we are loading (signing out)
  const isLoggingOut = isLoading && !!user

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      <AnimatePresence>
        {isLoggingOut && <LogoutLoader />}
      </AnimatePresence>
      
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header title={headerTitle} subtitle={headerSubtitle} />
        <div className="flex-1 overflow-y-auto min-h-0">
          {children}
        </div>
      </main>
      <ToastContainer />
    </div>
  )
}
