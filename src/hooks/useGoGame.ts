import { useState, useCallback } from 'react'
import { GameState, Move, StoneColor } from '../go-game.ts'

export type Position = { row: number; col: number }

export const useGoGame = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const board: StoneColor[][] = Array(5)
      .fill(null)
      .map(() => Array(5).fill(null))

    return {
      board,
      currentPlayer: 'black',
      capturedStones: { black: 0, white: 0 },
      moveHistory: [],
      gameOver: false
    }
  })

  const isInBounds = useCallback((row: number, col: number): boolean => {
    return row >= 0 && row < 5 && col >= 0 && col < 5
  }, [])

  const getGroup = useCallback((row: number, col: number, board: StoneColor[][]): Position[] => {
    const color = board[row][col]
    if (!color) return []

    const group: Position[] = []
    const visited = new Set<string>()
    const stack = [{ row, col }]

    while (stack.length > 0) {
      const pos = stack.pop()!
      const key = `${pos.row},${pos.col}`
      
      if (visited.has(key)) continue
      visited.add(key)
      
      if (isInBounds(pos.row, pos.col) && board[pos.row][pos.col] === color) {
        group.push(pos)
        
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
        for (const [dr, dc] of directions) {
          stack.push({ row: pos.row + dr, col: pos.col + dc })
        }
      }
    }

    return group
  }, [isInBounds])

  const getGroupLiberties = useCallback((group: Position[], board: StoneColor[][]): Position[] => {
    const liberties: Position[] = []
    const libertiesSet = new Set<string>()

    for (const pos of group) {
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
      for (const [dr, dc] of directions) {
        const adjRow = pos.row + dr
        const adjCol = pos.col + dc
        const key = `${adjRow},${adjCol}`

        if (isInBounds(adjRow, adjCol) && 
            board[adjRow][adjCol] === null &&
            !libertiesSet.has(key)) {
          liberties.push({ row: adjRow, col: adjCol })
          libertiesSet.add(key)
        }
      }
    }

    return liberties
  }, [isInBounds])

  const checkCaptures = useCallback((row: number, col: number, board: StoneColor[][], currentPlayer: 'black' | 'white'): Position[] => {
    const capturedStones: Position[] = []
    const opponentColor = currentPlayer === 'black' ? 'white' : 'black'
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    
    for (const [dr, dc] of directions) {
      const adjRow = row + dr
      const adjCol = col + dc
      
      if (isInBounds(adjRow, adjCol) && board[adjRow][adjCol] === opponentColor) {
        const group = getGroup(adjRow, adjCol, board)
        if (getGroupLiberties(group, board).length === 0) {
          for (const pos of group) {
            board[pos.row][pos.col] = null
            capturedStones.push(pos)
          }
        }
      }
    }
    
    return capturedStones
  }, [isInBounds, getGroup, getGroupLiberties])

  const makeMove = useCallback((row: number, col: number) => {
    if (gameState.gameOver || gameState.board[row][col] !== null) return false

    setGameState(prevState => {
      const newBoard = prevState.board.map(r => [...r])
      newBoard[row][col] = prevState.currentPlayer

      const capturedStones = checkCaptures(row, col, newBoard, prevState.currentPlayer)
      
      const move: Move = {
        player: prevState.currentPlayer,
        position: { row, col },
        moveNumber: prevState.moveHistory.length + 1,
        capturedStones
      }

      const newCapturedStones = { ...prevState.capturedStones }
      if (capturedStones.length > 0) {
        const opponentColor = prevState.currentPlayer === 'black' ? 'white' : 'black'
        newCapturedStones[opponentColor] += capturedStones.length
      }

      return {
        board: newBoard,
        currentPlayer: prevState.currentPlayer === 'black' ? 'white' : 'black',
        capturedStones: newCapturedStones,
        moveHistory: [...prevState.moveHistory, move],
        gameOver: false
      }
    })

    return true
  }, [gameState.gameOver, gameState.board, checkCaptures])

  const pass = useCallback(() => {
    if (gameState.gameOver) return

    setGameState(prevState => {
      const move: Move = {
        player: prevState.currentPlayer,
        position: null,
        moveNumber: prevState.moveHistory.length + 1
      }

      const newMoveHistory = [...prevState.moveHistory, move]
      
      // Check if both players passed
      const lastTwoMoves = newMoveHistory.slice(-2)
      const gameOver = lastTwoMoves.length === 2 && 
                      lastTwoMoves.every(move => move.position === null)

      return {
        ...prevState,
        currentPlayer: prevState.currentPlayer === 'black' ? 'white' : 'black',
        moveHistory: newMoveHistory,
        gameOver
      }
    })
  }, [gameState.gameOver])

  const newGame = useCallback(() => {
    const board: StoneColor[][] = Array(5)
      .fill(null)
      .map(() => Array(5).fill(null))

    setGameState({
      board,
      currentPlayer: 'black',
      capturedStones: { black: 0, white: 0 },
      moveHistory: [],
      gameOver: false
    })
  }, [])

  const canUndo = useCallback(() => {
    return gameState.moveHistory.length > 0
  }, [gameState.moveHistory.length])

  const undo = useCallback(() => {
    if (!canUndo()) return

    setGameState(prevState => {
      const newMoveHistory = [...prevState.moveHistory]
      const lastMove = newMoveHistory.pop()!
      
      const newBoard = prevState.board.map(r => [...r])
      
      if (lastMove.position) {
        newBoard[lastMove.position.row][lastMove.position.col] = null
        
        if (lastMove.capturedStones) {
          const opponentColor = lastMove.player === 'black' ? 'white' : 'black'
          for (const pos of lastMove.capturedStones) {
            newBoard[pos.row][pos.col] = opponentColor
          }
        }
      }

      const newCapturedStones = { ...prevState.capturedStones }
      if (lastMove.capturedStones) {
        const opponentColor = lastMove.player === 'black' ? 'white' : 'black'
        newCapturedStones[opponentColor] -= lastMove.capturedStones.length
      }

      return {
        board: newBoard,
        currentPlayer: lastMove.player,
        capturedStones: newCapturedStones,
        moveHistory: newMoveHistory,
        gameOver: false
      }
    })
  }, [canUndo])

  return {
    gameState,
    makeMove,
    pass,
    newGame,
    undo,
    canUndo: canUndo()
  }
}
