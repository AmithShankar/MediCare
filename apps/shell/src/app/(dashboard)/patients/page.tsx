import { PatientsClient } from '@medicare-pro/ui'

export default function Page() {
  return (
    <div className="p-4 lg:p-6 space-y-5 animate-page-enter">
      <PatientsClient />
    </div>
  )
}
