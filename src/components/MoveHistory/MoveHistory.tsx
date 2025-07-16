import React from 'react'
import { Move } from '../../go-game.ts'
import { Panel, Badge } from '../ui'
import styles from './MoveHistory.module.css'

interface MoveHistoryProps {
  moveHistory: Move[]
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moveHistory }) => {
  return (
    <Panel title="Move History" className={styles.moveHistory}>
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
              moveText = `${pos}`
              if (move.capturedStones && move.capturedStones.length > 0) {
                moveText += ` (${move.capturedStones.length} captured)`
              }
            } else {
              moveText = `Pass`
            }

            return (
              <div key={move.moveNumber} className={styles.moveEntry}>
                <Badge variant="default" size="small">{move.moveNumber}</Badge>
                <Badge
                  variant={move.player === 'black' ? 'black' : 'white'}
                  size="small"
                >
                  {symbol}
                </Badge>
                <span className={styles.movePlayer}>{moveText}</span>
              </div>
            )
          })
        )}
      </div>
    </Panel>
  )
}

export default MoveHistory
