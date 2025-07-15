import React from 'react'
import styles from './Footer.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>Built with TypeScript + React • Go rules simplified for 5×5</p>
    </footer>
  )
}

export default Footer
