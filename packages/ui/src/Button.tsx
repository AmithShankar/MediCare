import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@medicare-pro/utils'
import { Spinner } from './Spinner'
import { ButtonProps, ButtonVariant, ButtonSize } from '@medicare-pro/types'

const variants: Record<ButtonVariant, string> = {
  primary:   'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] shadow-lg shadow-primary/20',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost:     'text-muted-foreground hover:bg-accent hover:text-foreground',
  danger:    'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20',
  outline:   'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, className, disabled, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 ring-offset-background',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? <Spinner className="h-4 w-4" /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </Comp>
    )
  }
)
Button.displayName = 'Button'
