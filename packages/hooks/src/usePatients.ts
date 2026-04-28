import { useEffect } from 'react'
import { usePatientStore } from '@medicare-pro/store'
import { fetchPatients } from '@medicare-pro/utils'

export function usePatients() {
  const { 
    patients: allPatients, 
    filteredPatients: patients, 
    isLoading, 
    error, 
    filters, 
    departments,
    setPatients, 
    setLoading, 
    setError,
    setFilters,
    resetFilters
  } = usePatientStore()

  useEffect(() => {
    async function load() {
      if (allPatients.length > 0) return
      setLoading(true)
      try {
        const data = await fetchPatients()
        setPatients(data)
      } catch (err: unknown) {
        setError((err as { message?: string }).message ?? 'Failed to load patients')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [allPatients.length, setPatients, setLoading, setError])

  return {
    patients,
    allPatients,
    isLoading,
    error,
    filters,
    departments,
    setFilters,
    resetFilters
  }
}
