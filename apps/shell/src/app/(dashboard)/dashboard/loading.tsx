import { Skeleton } from "@medicare-pro/ui"

export default function DashboardLoading() {
  return (
    <div className="flex-1 p-4 lg:p-8 space-y-8 overflow-y-auto">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          <Skeleton className="h-[400px] rounded-2xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-[400px] rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
