'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Activity } from 'lucide-react'
import { signOut } from '@medicare-pro/utils'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const performLogout = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      try {
        await signOut()
        router.replace('/login')
      } catch (error) {
        console.error('Logout error:', error)
        router.replace('/login')
      }
    }
    performLogout()
  }, [router])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030406] selection:bg-primary/20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-primary/10 blur-[80px] rounded-full" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative mb-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 rounded-full border-t-2 border-primary/40 border-r-2 border-r-transparent"
          />
          
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 border border-white/10 shadow-xl">
            <Lock className="h-5 w-5 text-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-1"
        >
          <h1 className="text-lg font-bold text-white tracking-tight">
            Signing Out...
          </h1>
          <p className="text-slate-500 text-[13px] font-medium max-w-[180px]">
            Safely closing your clinical session
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center gap-4"
        >
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
            <ShieldCheck className="h-3 w-3 text-primary/60" />
            HIPAA Secure
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
            <Activity className="h-3 w-3 text-primary/60" />
            Session End
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-[8px] font-black text-slate-800 uppercase tracking-[0.3em]">
          MediCare Pro
        </p>
      </div>
    </div>
  )
}
