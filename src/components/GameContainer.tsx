import React from 'react'
import { useGoGame } from '../hooks/useGoGame.ts'
import GameInfo from './GameInfo.tsx'
import GoBoard from './GoBoard.tsx'
import MoveHistory from './MoveHistory.tsx'

const GameContainer: React.FC = () => {
  const { gameState, makeMove, pass, newGame, undo, canUndo } = useGoGame()

  const handleIntersectionClick = (row: number, col: number) => {
    makeMove(row, col)
  }

  return (
    <div id="game-container">
      <GameInfo 
        gameState={gameState}
        onNewGame={newGame}
        onPass={pass}
        onUndo={undo}
        canUndo={canUndo}
      />
      
      <GoBoard 
        board={gameState.board}
        onIntersectionClick={handleIntersectionClick}
      />
      
      <MoveHistory 
        moveHistory={gameState.moveHistory}
      />
    </div>
  )
}

export default GameContainer
