import React from 'react'
import { Move } from '../../go-game.ts'
import styles from './MoveHistory.module.css'

interface MoveHistoryProps {
  moveHistory: Move[]
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moveHistory }) => {
  return (
    <div className={styles.moveHistory}>
      <h3 className={styles.title}>Move History</h3>
      <div className={styles.movesList}>
        {moveHistory.length === 0 ? (
          <div className={styles.emptyState}>
            No moves yet
          </div>
        ) : (
          moveHistory.map((move) => {
            const symbol = move.player === 'black' ? '⚫' : '⚪'
            let moveText = ''

            if (move.position) {
              const pos = String.fromCharCode(65 + move.position.col) + (move.position.row + 1)
              moveText = `${symbol} ${pos}`
              if (move.capturedStones && move.capturedStones.length > 0) {
                moveText += ` (${move.capturedStones.length} captured)`
              }
            } else {
              moveText = `${symbol} Pass`
            }

            return (
              <div key={move.moveNumber} className={styles.moveEntry}>
                <span className={styles.moveNumber}>{move.moveNumber}.</span>
                <span className={styles.movePlayer}>{moveText}</span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default MoveHistory
