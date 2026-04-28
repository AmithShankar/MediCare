import Link from 'next/link'
import { HeartOff, ChevronLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600 shadow-2xl shadow-blue-500/40 rotate-3">
          <HeartOff className="h-12 w-12 text-white" />
        </div>
        <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-900 border border-border px-3 py-1 rounded-full shadow-lg">
          <span className="text-sm font-bold text-blue-600 tracking-tighter">404 Error</span>
        </div>
      </div>

      <div className="text-center max-w-md">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          The medical record or resource you are looking for has been moved or doesn't exist in our system.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 rounded-xl px-8 h-12 bg-blue-600 text-white hover:bg-blue-700 transition-colors text-lg font-medium shadow-lg shadow-blue-500/20"
          >
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 rounded-xl px-8 h-12 border border-border bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-lg font-medium"
          >
            <ChevronLeft className="h-4 w-4" />
            Go Home
          </Link>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-border w-full max-w-sm text-center">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
          MediCare Pro Intelligence
        </p>
      </div>
    </div>
  )
}

