'use client'

import Link from 'next/link'
import {
  ArrowLeft, Heart, Thermometer, Activity, Wind,
  Phone, Mail, MapPin, User, Pill, AlertTriangle,
  Shield, Bed, Calendar, UserCog,
} from 'lucide-react'
import { Avatar } from '@medicare-pro/ui'
import { StatusBadge, Badge } from '@medicare-pro/ui'
import { Card } from '@medicare-pro/ui'
import { Button } from '@medicare-pro/ui'
import { formatDate, formatAge } from '@medicare-pro/utils'
import { cn } from '@medicare-pro/utils'
import { Patient, PatientDetailPanelProps } from '@medicare-pro/types'

export function PatientDetailPanel({ patient: p }: PatientDetailPanelProps) {
  return (
    <div className="space-y-5 animate-page-enter">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Patients
      </Link>

      <Card padding="lg">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <Avatar name={p.fullName} size="xl" />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{p.fullName}</h2>
              <StatusBadge status={p.status} />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {formatAge(p.age)}, {p.gender}
              </span>
              <span className="flex items-center gap-1.5">
                <Bed className="h-3.5 w-3.5" />
                {p.department} • Bed {p.bedNumber}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Admitted {formatDate(p.admissionDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <UserCog className="h-3.5 w-3.5" />
                {p.treatingPhysician}
              </span>
            </div>
            <div className="mt-2">
              <Badge variant="blue">{p.mrn}</Badge>
              <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">{p.diagnosis}</span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm">Edit</Button>
            <Button size="sm">Schedule</Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card padding="md" className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Current Vitals</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <VitalBox
              icon={Heart} label="Heart Rate"
              value={`${p.vitals.heartRate} bpm`}
              lightColor="text-rose-500 bg-rose-50"
              darkColor="dark:bg-rose-500/10 dark:text-rose-400"
              alert={p.vitals.heartRate > 100 || p.vitals.heartRate < 60}
            />
            <VitalBox
              icon={Activity} label="Blood Pressure"
              value={p.vitals.bloodPressure} unit="mmHg"
              lightColor="text-brand-500 bg-brand-50"
              darkColor="dark:bg-brand-500/10 dark:text-brand-400"
            />
            <VitalBox
              icon={Thermometer} label="Temperature"
              value={`${p.vitals.temperature}°F`}
              lightColor="text-amber-500 bg-amber-50"
              darkColor="dark:bg-amber-500/10 dark:text-amber-400"
              alert={p.vitals.temperature > 100.4}
            />
            <VitalBox
              icon={Wind} label="SpO₂"
              value={`${p.vitals.oxygenSaturation}%`}
              lightColor="text-emerald-500 bg-emerald-50"
              darkColor="dark:bg-emerald-500/10 dark:text-emerald-400"
              alert={p.vitals.oxygenSaturation < 92}
            />
            <VitalBox
              icon={Activity} label="Resp. Rate"
              value={`${p.vitals.respiratoryRate} /min`}
              lightColor="text-violet-500 bg-violet-50"
              darkColor="dark:bg-violet-500/10 dark:text-violet-400"
              alert={p.vitals.respiratoryRate > 20}
            />
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 flex flex-col items-center text-center">
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100">{p.bloodGroup}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Blood Group</span>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Contact Info</h3>
          <ul className="space-y-3">
            <ContactRow icon={Phone} value={p.phoneNumber} />
            <ContactRow icon={Mail} value={p.email} />
            <ContactRow icon={MapPin} value={p.address} />
          </ul>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">Emergency Contact</p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{p.emergencyContact.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{p.emergencyContact.relationship}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{p.emergencyContact.phone}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card padding="md">
          <div className="flex items-center gap-2 mb-3">
            <Pill className="h-4 w-4 text-brand-500" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Medications</h3>
          </div>
          {p.medications.length ? (
            <ul className="space-y-2">
              {p.medications.map((m: string) => (
                <li key={m} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
          ) : <p className="text-sm text-slate-400 dark:text-slate-500">None recorded</p>}
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-warning-500" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Allergies</h3>
          </div>
          {p.allergies.length ? (
            <div className="flex flex-wrap gap-2">
              {p.allergies.map((a: string) => (
                <Badge key={a} variant="amber">{a}</Badge>
              ))}
            </div>
          ) : <p className="text-sm text-slate-400 dark:text-slate-500">No known allergies</p>}
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 text-emerald-500" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Insurance</h3>
          </div>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{p.insuranceProvider}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">{p.insuranceId}</p>
        </Card>
      </div>

      {p.notes && (
        <Card padding="md">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Clinical Notes</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p.notes}</p>
        </Card>
      )}
    </div>
  )
}

function VitalBox({
  icon: Icon, label, value, lightColor, darkColor, alert,
}: {
  icon: typeof Heart
  label: string
  value: string
  unit?: string
  lightColor: string
  darkColor: string
  alert?: boolean
}) {
  const [iconColor, bgColor] = lightColor.split(' ')
  return (
    <div className={cn('relative rounded-xl p-4', bgColor, darkColor.split(' ')[0])}>
      {alert && (
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-danger-500 animate-pulse" />
      )}
      <div className={cn('mb-2', iconColor, darkColor.split(' ')[1])}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-base font-bold text-slate-900 dark:text-slate-100">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
    </div>
  )
}

function ContactRow({ icon: Icon, value }: { icon: typeof Phone; value: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <Icon className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
      <span className="text-xs text-slate-600 dark:text-slate-400">{value}</span>
    </li>
  )
}
