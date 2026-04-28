import Image from 'next/image'
import { cn } from '@medicare-pro/utils'
import { getInitials } from '@medicare-pro/utils'
import { AvatarProps, AvatarSize } from '@medicare-pro/types'

const COLORS = [
  'bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300',
  'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300',
  'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
  'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
  'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300',
  'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300',
]

function colorFor(name: string) {
  return COLORS[name.charCodeAt(0) % COLORS.length]
}

const SIZES: Record<AvatarSize, { wrap: string; text: string; px: number }> = {
  xs: { wrap: 'h-6 w-6',   text: 'text-[9px]',  px: 24 },
  sm: { wrap: 'h-8 w-8',   text: 'text-xs',     px: 32 },
  md: { wrap: 'h-9 w-9',   text: 'text-sm',     px: 36 },
  lg: { wrap: 'h-10 w-10', text: 'text-sm',     px: 40 },
  xl: { wrap: 'h-14 w-14', text: 'text-base',   px: 56 },
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const { wrap, text, px } = SIZES[size]

  if (src) {
    return (
      <div className={cn('relative rounded-full overflow-hidden shrink-0', wrap, className)}>
        <Image src={src} alt={name} width={px} height={px} className="object-cover" />
      </div>
    )
  }

  return (
    <div className={cn('rounded-full flex items-center justify-center font-semibold shrink-0', colorFor(name), wrap, text, className)}>
      {getInitials(name)}
    </div>
  )
}
