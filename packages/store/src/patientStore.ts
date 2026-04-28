import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { Patient, FilterState } from '@medicare-pro/types'
import { filterPatients, getDepartments } from '@medicare-pro/utils'

interface PatientState {
  patients: Patient[]
  filteredPatients: Patient[]
  selectedPatient: Patient | null
  isLoading: boolean
  error: string | null
  filters: FilterState
  departments: string[]

  setPatients: (patients: Patient[]) => void
  setSelectedPatient: (patient: Patient | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilters: (filters: Partial<FilterState>) => void
  resetFilters: () => void
  addPatient: (patient: Patient) => void
}

const DEFAULT_FILTERS: FilterState = {
  search: '',
  status: 'all',
  department: 'all',
  gender: 'all',
}

export const usePatientStore = create<PatientState>()(
  subscribeWithSelector((set, get) => ({
    patients: [],
    filteredPatients: [],
    selectedPatient: null,
    isLoading: false,
    error: null,
    filters: DEFAULT_FILTERS,
    departments: [],

    setPatients: (patients) =>
      set({
        patients,
        filteredPatients: filterPatients(patients, get().filters),
        departments: getDepartments(patients),
      }),

    setSelectedPatient: (selectedPatient) => set({ selectedPatient }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),

    setFilters: (partial) => {
      const filters = { ...get().filters, ...partial }
      set({ filters, filteredPatients: filterPatients(get().patients, filters) })
    },

    resetFilters: () =>
      set({ filters: DEFAULT_FILTERS, filteredPatients: get().patients }),

    addPatient: (patient) => {
      const patients = [patient, ...get().patients]
      set({
        patients,
        filteredPatients: filterPatients(patients, get().filters),
        departments: getDepartments(patients),
      })
    },
  }))
)
