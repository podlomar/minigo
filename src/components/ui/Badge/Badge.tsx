import React from 'react'
import styles from './Badge.module.css'

export type BadgeVariant = 'default' | 'accent' | 'black' | 'white'
export type BadgeSize = 'small' | 'medium' | 'large'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  className = ''
}) => {
  const badgeClasses = [
    styles.badge,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ')

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  )
}

export default Badge
