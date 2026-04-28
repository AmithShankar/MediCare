import { PatientDetailPage } from '@medicare-pro/ui'

export default function Page({ params }: { params: { id: string } }) {
  return <PatientDetailPage patientId={params.id} />
}
