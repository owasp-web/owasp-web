import React from 'react'

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  noPadding?: boolean
}

export default function ResponsiveContainer({ 
  children, 
  className = '', 
  size = 'xl',
  noPadding = false 
}: ResponsiveContainerProps) {
  const sizeClasses = {
    sm: 'max-w-screen-sm',     // 640px
    md: 'max-w-screen-md',     // 768px  
    lg: 'max-w-screen-lg',     // 1024px
    xl: 'max-w-screen-xl',     // 1280px
    full: 'max-w-[1440px]'     // Custom OWASP max-width
  }

  const paddingClasses = noPadding 
    ? '' 
    : 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px]'

  return (
    <div className={`${sizeClasses[size]} mx-auto ${paddingClasses} ${className}`}>
      {children}
    </div>
  )
} 