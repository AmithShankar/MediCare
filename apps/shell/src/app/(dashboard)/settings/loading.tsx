import { Skeleton } from "@medicare-pro/ui"

export default function SettingsLoading() {
  return (
    <div className="flex-1 p-4 lg:p-8 space-y-8 overflow-y-auto">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-72 space-y-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl" />
          ))}
        </div>
        <div className="flex-1 space-y-6">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
