'use client'

import { motion } from 'framer-motion'
import { cn } from '@medicare-pro/utils'
import { StatCardProps } from '@medicare-pro/types'

export function StatCard({ 
  title, value, subtitle, icon: Icon, iconColor, iconBg, 
  trend, trendValue, suffix, index = 0 
}: StatCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="premium-card p-6 hover:border-primary/20 hover:scale-[1.02] transition-all group"
    >
      <div className="flex items-start justify-between mb-5">
        <div className={cn(
          'flex h-11 w-11 items-center justify-center rounded-2xl shadow-inner transition-transform group-hover:scale-110 duration-300', 
          iconBg
        )}>
          <Icon className={cn('h-5 w-5', iconColor)} />
        </div>
        
        {trend && trendValue && (
          <div className={cn(
            'flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter shadow-sm',
            trend === 'up'      && 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/10',
            trend === 'down'    && 'bg-destructive/10 text-destructive border border-destructive/10',
            trend === 'neutral' && 'bg-muted text-muted-foreground border border-border/50',
          )}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {trendValue}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-display font-black tracking-tight text-foreground">{value}</span>
          {suffix && <span className="text-sm font-bold text-muted-foreground/60">{suffix}</span>}
        </div>
        <p className="text-sm font-bold text-muted-foreground tracking-tight">{title}</p>
        {subtitle && (
          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="absolute -bottom-1 -right-1 h-12 w-12 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
    </motion.div>
  )
}
