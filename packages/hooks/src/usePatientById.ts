import { useState, useEffect } from 'react'
import type { Patient } from '@medicare-pro/types'
import { fetchPatientById } from '@medicare-pro/utils'

export function usePatientById(id: string) {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    async function load() {
      setLoading(true)
      try {
        const data = await fetchPatientById(id)
        setPatient(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load patient')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  return { patient, isLoading, error }
}
