import React from 'react'
import styles from './Panel.module.css'

interface PanelProps {
  children: React.ReactNode
  className?: string
  title?: string
  padding?: 'none' | 'small' | 'medium' | 'large'
}

const Panel: React.FC<PanelProps> = ({
  children,
  className = '',
  title,
  padding = 'medium'
}) => {
  const panelClasses = [
    styles.panel,
    styles[`padding-${padding}`],
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={panelClasses}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default Panel
