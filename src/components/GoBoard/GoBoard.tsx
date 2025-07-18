import React, { useState } from 'react'
import { StoneColor } from '../../go-game.ts'
import styles from './GoBoard.module.css'

interface GoBoardProps {
  board: StoneColor[][]
  onIntersectionClick: (row: number, col: number) => void
}

const GoBoard: React.FC<GoBoardProps> = ({ board, onIntersectionClick }) => {
  const boardSize = 5
  const cellSize = 60
  const margin = 30
  const svgSize = (boardSize - 1) * cellSize + 2 * margin
  const [hoveredCell, setHoveredCell] = useState<{ row: number, col: number } | null>(null)

  const handleCellClick = (row: number, col: number) => {
    if (!board[row][col]) {
      onIntersectionClick(row, col)
    }
  }

  const handleCellMouseEnter = (row: number, col: number) => {
    if (!board[row][col]) {
      setHoveredCell({ row, col })
    }
  }

  const handleCellMouseLeave = () => {
    setHoveredCell(null)
  }

  return (
    <div className={styles.goBoardContainer}>
      <svg
        width={svgSize}
        height={svgSize}
        className={styles.goBoard}
        style={{ cursor: 'pointer' }}
      >
        {/* Board background with wood texture gradient */}
        <defs>
          <linearGradient id="woodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-wood-light)" />
            <stop offset="100%" stopColor="var(--color-wood-dark)" />
          </linearGradient>

          {/* Stone gradients */}
          <linearGradient id="blackStone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-stone-black-light)" />
            <stop offset="100%" stopColor="var(--color-stone-black-dark)" />
          </linearGradient>

          <linearGradient id="whiteStone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-stone-white-light)" />
            <stop offset="100%" stopColor="var(--color-stone-white-dark)" />
          </linearGradient>

          {/* Drop shadow filter */}
          <filter id="stoneShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Board background */}
        <rect
          x="0"
          y="0"
          width={svgSize}
          height={svgSize}
          fill="url(#woodGradient)"
          stroke="none"
          rx="6"
        />

        {/* Grid lines */}
        {Array.from({ length: boardSize }, (_, i) => (
          <g key={`lines-${i}`}>
            {/* Horizontal lines */}
            <line
              x1={margin}
              y1={margin + i * cellSize}
              x2={svgSize - margin}
              y2={margin + i * cellSize}
              stroke="var(--color-grid-lines)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* Vertical lines */}
            <line
              x1={margin + i * cellSize}
              y1={margin}
              x2={margin + i * cellSize}
              y2={svgSize - margin}
              stroke="var(--color-grid-lines)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* Star point (center for 5x5 board) */}
        <circle
          cx={margin + 2 * cellSize}
          cy={margin + 2 * cellSize}
          r="2"
          fill="var(--color-grid-lines)"
          opacity="0.6"
        />

        {/* Intersection click areas and stones */}
        {board.map((row, rowIndex) =>
          row.map((stone, colIndex) => {
            const x = margin + colIndex * cellSize
            const y = margin + rowIndex * cellSize
            const isHovered = hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex

            return (
              <g key={`${rowIndex}-${colIndex}`}>
                {/* Invisible click area */}
                <circle
                  cx={x}
                  cy={y}
                  r="24"
                  fill="transparent"
                  style={{ cursor: stone ? 'default' : 'pointer' }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                  onMouseLeave={handleCellMouseLeave}
                />

                {/* Hover indicator */}
                {isHovered && !stone && (
                  <circle
                    cx={x}
                    cy={y}
                    r="24"
                    fill="rgba(255, 255, 255, 0.2)"
                    pointerEvents="none"
                  />
                )}

                {/* Stone */}
                {stone && (
                  <circle
                    cx={x}
                    cy={y}
                    r="24"
                    fill={stone === 'black' ? 'url(#blackStone)' : 'url(#whiteStone)'}
                    stroke="none"
                    strokeWidth="0"
                    filter="url(#stoneShadow)"
                    className={styles.stone}
                  />
                )}
              </g>
            )
          })
        )}
      </svg>
    </div>
  )
}

export default GoBoard
