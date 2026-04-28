import { MOCK_PATIENTS } from '../mockData'
import type { Patient, FilterState } from '@medicare-pro/types'

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchPatients(): Promise<Patient[]> {
  await delay()
  return [...MOCK_PATIENTS]
}

export async function fetchPatientById(id: string): Promise<Patient | null> {
  await delay(200)
  return MOCK_PATIENTS.find((p) => p.id === id) ?? null
}

export async function addPatient(patient: Omit<Patient, 'id' | 'mrn' | 'fullName'>): Promise<Patient> {
  await delay(600)
  const newPatient: Patient = {
    ...patient,
    id: `p-${Date.now()}`,
    mrn: `MRN-${new Date().getFullYear()}-${String(MOCK_PATIENTS.length + 1).padStart(3, '0')}`,
    fullName: `${patient.firstName} ${patient.lastName}`,
  }
  MOCK_PATIENTS.push(newPatient)
  return newPatient
}

export function filterPatients(patients: Patient[], filters: FilterState): Patient[] {
  return patients.filter((p) => {
    const matchesSearch =
      !filters.search ||
      p.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.mrn.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.treatingPhysician.toLowerCase().includes(filters.search.toLowerCase())

    const matchesStatus = filters.status === 'all' || p.status === filters.status
    const matchesDepartment = filters.department === 'all' || p.department === filters.department
    const matchesGender = filters.gender === 'all' || p.gender === filters.gender

    return matchesSearch && matchesStatus && matchesDepartment && matchesGender
  })
}

export function getDepartments(patients: Patient[]): string[] {
  return [...new Set(patients.map((p) => p.department))].sort()
}
