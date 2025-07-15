import React from 'react'
import styles from './Header.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>🔴⚫ MiniGo</h1>
      <p className={styles.subtitle}>Ancient strategy, modern web</p>
    </header>
  )
}

export default Header
