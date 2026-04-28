import { Skeleton } from "@medicare-pro/ui"

export default function NotificationsLoading() {
  return (
    <div className="flex-1 p-4 lg:p-8 space-y-8 overflow-y-auto">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="bg-card border border-border/60 p-4 rounded-2xl flex justify-between">
        <Skeleton className="h-8 w-64 rounded-full" />
        <Skeleton className="h-8 w-32 rounded-xl" />
      </div>

      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-5 rounded-2xl border border-border/40 bg-card/40 flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
