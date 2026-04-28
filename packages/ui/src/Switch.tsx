'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@medicare-pro/utils'

import { SwitchProps } from '@medicare-pro/types'

export function Switch({ checked, defaultChecked, onCheckedChange, disabled, className }: SwitchProps) {
  const isControlled = checked !== undefined
  return (
    <SwitchPrimitive.Root
      checked={isControlled ? checked : undefined}
      defaultChecked={!isControlled ? defaultChecked : undefined}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent',
        'transition-colors duration-200 ease-in-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
        'disabled:cursor-not-allowed disabled:opacity-40',
        'data-[state=checked]:bg-brand-600 data-[state=unchecked]:bg-slate-200 dark:data-[state=unchecked]:bg-slate-700',
        className
      )}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm',
          'transform transition-transform duration-200 ease-in-out',
          'data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-4'
        )}
      />
    </SwitchPrimitive.Root>
  )
}
