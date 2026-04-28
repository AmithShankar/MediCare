'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@medicare-pro/utils'
import { SelectOption } from '@medicare-pro/types'

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
  triggerClassName?: string
}

export function Select({ value, onValueChange, options, placeholder, triggerClassName }: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        className={cn(
          'flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm font-medium min-w-[130px]',
          'border-border',
          'bg-white dark:bg-slate-900',
          'text-slate-700 dark:text-slate-200',
          'hover:bg-slate-50 dark:hover:bg-slate-800',
          'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-0',
          'data-[placeholder]:text-slate-400 dark:data-[placeholder]:text-slate-500',
          'transition-colors duration-100',
          triggerClassName
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className={cn(
            'z-50 min-w-[var(--radix-select-trigger-width)] rounded-xl border overflow-hidden',
            'border-border',
            'bg-white dark:bg-slate-900',
            'shadow-lg dark:shadow-slate-950/50',
            'animate-slide-down'
          )}
        >
          <SelectPrimitive.Viewport className="p-1.5">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  'relative flex items-center justify-between gap-4 rounded-lg px-3 py-2 text-sm',
                  'text-slate-700 dark:text-slate-300',
                  'outline-none cursor-pointer select-none',
                  'data-[highlighted]:bg-slate-50 dark:data-[highlighted]:bg-slate-800',
                  'data-[highlighted]:text-slate-900 dark:data-[highlighted]:text-slate-100',
                  'data-[state=checked]:text-brand-600 dark:data-[state=checked]:text-brand-400',
                  'transition-colors duration-75'
                )}
              >
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check className="h-3.5 w-3.5" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
