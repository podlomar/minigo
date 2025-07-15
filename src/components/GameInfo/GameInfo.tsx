import React from 'react'
import { GameState } from '../../go-game.ts'
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
    <div className={styles.gameInfo}>
      <div className={styles.playerInfo}>
        <div className={styles.currentPlayer}>
          <span className={styles.playerLabel}>Current Player:</span>
          <span
            className={`${styles.player} ${styles[gameState.currentPlayer]}`}
          >
            {currentPlayerSymbol} {currentPlayerName}
          </span>
        </div>
        <div className={styles.capturedStones}>
          <div className={styles.captureCount}>
            <span className={styles.captureItem}>⚫ Captured: <span>{gameState.capturedStones.black}</span></span>
            <span className={styles.captureItem}>⚪ Captured: <span>{gameState.capturedStones.white}</span></span>
          </div>
        </div>
      </div>

      <div className={styles.gameControls}>
        <button
          className={`${styles.button} ${gameState.gameOver ? styles.newGameButton : styles.resetButton}`}
          onClick={onNewGame}
        >
          {gameState.gameOver ? 'New Game' : 'Reset'}
        </button>
        <button
          className={styles.button}
          onClick={onPass}
          disabled={gameState.gameOver}
        >
          Pass
        </button>
        <button
          className={styles.button}
          onClick={onUndo}
          disabled={!canUndo}
        >
          Undo
        </button>
      </div>
    </div>
  )
}

export default GameInfo
