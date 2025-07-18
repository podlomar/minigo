import React from 'react'
import { GameState } from '../../go-game.ts'
import { Button, Badge, Panel } from '../ui'
import styles from './GameInfo.module.css'

interface GameInfoProps {
  gameState: GameState
  onNewGame: () => void
  onPass: () => void
  onUndo: () => void
  canUndo: boolean
}

const GameInfo: React.FC<GameInfoProps> = ({
  gameState,
  onNewGame,
  onPass,
  onUndo,
  canUndo
}) => {
  const currentPlayerSymbol = gameState.currentPlayer === 'black' ? '⚫' : '⚪'
  const currentPlayerName = gameState.currentPlayer.charAt(0).toUpperCase() + gameState.currentPlayer.slice(1)

  return (
    <Panel className={styles.gameInfo}>
      <div className={styles.playerInfo}>
        <div className={styles.currentPlayer}>
          <span className={styles.playerLabel}>Current Player:</span>
          <Badge
            variant={gameState.currentPlayer === 'black' ? 'black' : 'white'}
            size="large"
          >
            {currentPlayerSymbol} {currentPlayerName}
          </Badge>
        </div>
        <div className={styles.capturedStones}>
          <div className={styles.captureCount}>
            <span className={styles.captureItem}>⚫ Captured: <Badge variant="default">{gameState.capturedStones.black}</Badge></span>
            <span className={styles.captureItem}>⚪ Captured: <Badge variant="default">{gameState.capturedStones.white}</Badge></span>
          </div>
        </div>
      </div>

      <div className={styles.gameControls}>
        <Button
          variant={gameState.gameOver ? 'success' : 'danger'}
          onClick={onNewGame}
        >
          {gameState.gameOver ? 'New Game' : 'Reset'}
        </Button>
        <Button
          variant="secondary"
          onClick={onPass}
          disabled={gameState.gameOver}
        >
          Pass
        </Button>
        <Button
          variant="primary"
          onClick={onUndo}
          disabled={!canUndo}
        >
          Undo
        </Button>
      </div>
    </Panel>
  )
}

export default GameInfo
