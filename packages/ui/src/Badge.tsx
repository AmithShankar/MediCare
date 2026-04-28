import { cn, STATUS_LABELS, STATUS_DOT } from '@medicare-pro/utils'
import { StatusBadgeProps, BadgeProps, BadgeVariant } from '@medicare-pro/types'

const STATUS_STYLES: Record<string, string> = {
  stable:     'bg-success-500/10 text-success-600 dark:text-success-400 border-success-500/20',
  critical:   'bg-danger-500/10 text-danger-600 dark:text-danger-400 border-danger-500/20',
  recovering: 'bg-warning-500/10 text-warning-600 dark:text-warning-400 border-warning-500/20',
  discharged: 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/20',
}

export function StatusBadge({ status, showDot = true, size = 'md' }: StatusBadgeProps) {
  const dotColor = STATUS_DOT[status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full font-bold uppercase tracking-widest transition-all duration-300 border',
        size === 'sm' ? 'px-2 py-0.5 text-[8px]' : 'px-3 py-1 text-[9px]',
        STATUS_STYLES[status] ?? 'bg-slate-500/10 text-slate-500 border-slate-500/20'
      )}
    >
      {showDot && (
        <span className="relative flex h-2 w-2">
          {status === 'critical' && (
            <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', dotColor)} />
          )}
          <span className={cn('relative inline-flex rounded-full h-2 w-2 shadow-sm', dotColor)} />
        </span>
      )}
      {STATUS_LABELS[status]}
    </span>
  )
}

const VARIANTS: Record<BadgeVariant, string> = {
  default: 'bg-accent/50 text-muted-foreground border border-border/50',
  blue:    'bg-primary/10 text-primary border border-primary/20',
  green:   'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
  amber:   'bg-amber-500/10 text-amber-600 border border-amber-500/20',
  red:     'bg-destructive/10 text-destructive border border-destructive/20',
  violet:  'bg-violet-500/10 text-violet-600 border border-violet-500/20',
  slate:   'bg-slate-500/10 text-slate-600 border border-slate-500/20',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-lg px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest', 
      VARIANTS[variant], 
      className
    )}>
      {children}
    </span>
  )
}
