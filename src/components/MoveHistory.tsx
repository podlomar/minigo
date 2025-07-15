import React from 'react'
import { Move } from '../go-game.ts'

interface MoveHistoryProps {
  moveHistory: Move[]
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moveHistory }) => {
  return (
    <div id="move-history">
      <h3>Move History</h3>
      <div id="moves-list">
        {moveHistory.length === 0 ? (
          <div style={{ opacity: 0.6, fontStyle: 'italic' }}>
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
              <div key={move.moveNumber} className="move-entry">
                <span className="move-number">{move.moveNumber}.</span>
                <span className="move-player">{moveText}</span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default MoveHistory
