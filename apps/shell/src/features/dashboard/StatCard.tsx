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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
      className="premium-card p-4 sm:p-5 group cursor-default hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Colored top-edge accent */}
      <div className={cn('absolute inset-x-0 top-0 h-[3px] rounded-t-xl opacity-60', iconBg)} />

      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className={cn(
          'flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110 duration-200 shrink-0',
          iconBg
        )}>
          <Icon className={cn('h-4 w-4 sm:h-5 sm:w-5', iconColor)} />
        </div>

        {trend && trendValue && (
          <span className={cn(
            'flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg tracking-tight leading-tight text-right',
            trend === 'up'      && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
            trend === 'down'    && 'bg-destructive/10 text-destructive',
            trend === 'neutral' && 'bg-muted text-muted-foreground',
          )}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''}
            &nbsp;{trendValue}
          </span>
        )}
      </div>

      <div className="space-y-0.5">
        <div className="flex items-baseline gap-1">
          <span className="text-xl sm:text-2xl font-display font-black tracking-tight text-foreground tabular-nums">
            {value}
          </span>
          {suffix && <span className="text-xs sm:text-sm font-semibold text-muted-foreground">{suffix}</span>}
        </div>
        <p className="text-[12px] sm:text-[13px] font-semibold text-muted-foreground leading-tight">{title}</p>
        {subtitle && (
          <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest pt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  )
}
