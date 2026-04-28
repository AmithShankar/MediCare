import { cn } from '@medicare-pro/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/60", className)}
      {...props}
    />
  )
}

function SkeletonText({ className, lines = 1 }: { className?: string, lines?: number }) {
  return (
    <div className="space-y-2">
      {[...Array(lines)].map((_, i) => (
        <Skeleton key={i} className={cn("h-3 w-full rounded", className)} />
      ))}
    </div>
  )
}

function SkeletonAvatar({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg' | 'xl', className?: string }) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
    xl: 'h-20 w-20'
  }
  return <Skeleton className={cn("rounded-full shrink-0", sizes[size], className)} />
}

function SkeletonCard({ className, children }: { className?: string, children?: React.ReactNode }) {
  return (
    <div className={cn("premium-card p-6 border-border/50", className)}>
      {children || (
        <div className="space-y-3">
          <Skeleton className="h-4 w-1/3 rounded" />
          <SkeletonText lines={2} />
        </div>
      )}
    </div>
  )
}

function SkeletonPatientRow() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-border/50 last:border-0">
      <SkeletonAvatar size="md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/4 rounded" />
        <Skeleton className="h-3 w-1/6 rounded" />
      </div>
      <Skeleton className="h-6 w-20 rounded-lg" />
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
  )
}

export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonPatientRow }
