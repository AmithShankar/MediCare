import { cn } from '@medicare-pro/utils'
import { CardProps } from '@medicare-pro/types'

const PADDING = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' }

export function Card({ 
  children, className, hover, padding = 'md', as: As = 'div',
  title, subtitle
}: CardProps) {
  return (
    <As
      className={cn(
        'premium-card overflow-hidden',
        hover && 'hover:scale-[1.01] cursor-pointer',
        PADDING[padding],
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="text-lg font-display font-bold text-foreground tracking-tight">{title}</h3>}
          {subtitle && <p className="text-xs text-muted-foreground font-medium mt-1 uppercase tracking-wider">{subtitle}</p>}
        </div>
      )}
      {children}
    </As>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex items-center justify-between mb-5 border-b pb-4 border-border/50', className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('text-base font-display font-bold text-foreground tracking-tight', className)}>{children}</h3>
}
