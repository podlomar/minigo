import React from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'
export type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className
  ].filter(Boolean).join(' ')

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

export default Button
