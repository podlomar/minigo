import React from 'react'
import { GameState } from '../go-game.ts'

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
    <div id="game-info">
      <div className="player-info">
        <div id="current-player">
          <span className="player-label">Current Player:</span>
          <span 
            id="player-indicator" 
            className={`player ${gameState.currentPlayer}`}
          >
            {currentPlayerSymbol} {currentPlayerName}
          </span>
        </div>
        <div id="captured-stones">
          <div className="capture-count">
            <span>⚫ Captured: <span id="black-captured">{gameState.capturedStones.black}</span></span>
            <span>⚪ Captured: <span id="white-captured">{gameState.capturedStones.white}</span></span>
          </div>
        </div>
      </div>

      <div className="game-controls">
        <button 
          id="new-game" 
          onClick={onNewGame}
          style={{
            background: gameState.gameOver 
              ? 'linear-gradient(135deg, #e53e3e, #c53030)' 
              : 'linear-gradient(135deg, #4a5568, #2d3748)'
          }}
        >
          {gameState.gameOver ? 'New Game' : 'Reset'}
        </button>
        <button 
          id="pass-turn" 
          onClick={onPass}
          disabled={gameState.gameOver}
        >
          Pass
        </button>
        <button 
          id="undo-move" 
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
