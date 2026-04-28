'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Mail, Lock, Heart, ShieldCheck, Activity, Users, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@medicare-pro/hooks'
import { loginSchema, type LoginSchema, cn } from '@medicare-pro/utils'

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { loginWithEmail, loginWithGoogle, isLoading } = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <div className="flex min-h-screen bg-background selection:bg-primary/20">
      <div className="hidden lg:flex lg:w-[50%] xl:w-[60%] relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-950 via-slate-950/90 to-slate-900/50" />
        <div className="relative z-20 flex flex-col justify-between p-16 w-full">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-2xl shadow-primary/40 ring-4 ring-white/5">
              <Heart className="h-6 w-6 text-white fill-white/20" />
            </div>
            <span className="text-2xl font-display font-black text-white tracking-tight">
              MediCare <span className="text-primary">Pro</span>
            </span>
          </motion.div>

          <div className="max-w-xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-5xl xl:text-7xl font-display font-black text-white leading-[1.1] tracking-tight">
                Digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Excellence</span> <br />
                in Patient Care.
              </h2>
              <p className="mt-8 text-xl text-slate-400 leading-relaxed font-medium">
                The world's most advanced B2B healthcare intelligence platform.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12 space-y-4">
              {[
                { icon: ShieldCheck, label: 'Enterprise Grade Security', sub: 'HIPAA & GDPR Compliant architecture' },
                { icon: Activity, label: 'Real-time Intelligence', sub: 'Instant vitals and critical alert system' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 p-5 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl hover:bg-white/[0.06] transition-all group cursor-default">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white tracking-tight">{item.label}</p>
                    <p className="text-sm text-slate-500 font-medium">{item.sub}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-700 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex items-center gap-6 text-slate-500 text-sm font-bold uppercase tracking-[0.2em]">
            <p>© {new Date().getFullYear()} MEDICARE INTEL</p>
            <div className="h-1 w-1 rounded-full bg-slate-800" />
            <p>500+ HOSPITALS SECURED</p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-[50%] xl:w-[40%] flex flex-col items-center justify-center p-8 lg:p-16 bg-background relative overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[420px] space-y-10">
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-4xl font-display font-black text-foreground tracking-tight">Clinician Login</h1>
            <p className="text-muted-foreground font-medium">Access your hospital's secure dashboard</p>
          </div>

          <div className="premium-card p-10 border-border/60 shadow-2xl shadow-black/5 dark:shadow-black/20">
            <form onSubmit={handleSubmit((d) => loginWithEmail(d.email, d.password))} className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Work Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="name@hospital.com"
                    {...register('email')}
                    className={cn(
                      'w-full h-12 rounded-2xl border border-input pl-12 pr-4 py-2 text-[15px] transition-all bg-muted/30 font-medium',
                      'focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-background',
                      errors.email && 'border-destructive focus:ring-destructive/10'
                    )}
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-xs text-destructive font-bold ml-1">
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[13px] font-bold text-muted-foreground uppercase tracking-wider">Password</label>
                  <button type="button" className="text-xs font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-wider">Recover</button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    className={cn(
                      'w-full h-12 rounded-2xl border border-input pl-12 pr-12 py-2 text-[15px] transition-all bg-muted/30 font-medium',
                      'focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-background',
                      errors.password && 'border-destructive focus:ring-destructive/10'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-xs text-destructive font-bold ml-1">
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-2xl text-lg font-black tracking-tight shadow-xl shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-all"
              >
                {isLoading ? 'Signing in...' : 'Enter System'}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-4 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60">Institutional Access</span>
              </div>
            </div>

            <button
              type="button"
              onClick={loginWithGoogle}
              disabled={isLoading}
              className={cn(
                'w-full h-14 flex items-center justify-center gap-3 rounded-2xl border border-input px-4 py-2 text-base font-bold transition-all',
                'bg-background text-foreground hover:bg-muted/50 hover:border-border active:scale-[0.98]',
                'disabled:opacity-40 disabled:pointer-events-none'
              )}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 2.18 2.18 5.38l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
          </div>

          <div className="flex items-center justify-center gap-6">
            <Users className="h-5 w-5 text-muted-foreground/40" />
            <ShieldCheck className="h-5 w-5 text-muted-foreground/40" />
            <Activity className="h-5 w-5 text-muted-foreground/40" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
