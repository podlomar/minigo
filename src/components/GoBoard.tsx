import React from 'react'
import { StoneColor } from '../go-game.ts'

interface GoBoardProps {
  board: StoneColor[][]
  onIntersectionClick: (row: number, col: number) => void
}

interface IntersectionProps {
  row: number
  col: number
  stone: StoneColor
  onClick: (row: number, col: number) => void
  isEdge: {
    top: boolean
    bottom: boolean
    left: boolean
    right: boolean
  }
  isStar: boolean
}

const Intersection: React.FC<IntersectionProps> = ({
  row,
  col,
  stone,
  onClick,
  isEdge,
  isStar
}) => {
  const handleClick = () => {
    if (!stone) {
      onClick(row, col)
    }
  }

  const classNames = [
    'intersection',
    isEdge.top && 'top',
    isEdge.bottom && 'bottom',
    isEdge.left && 'left',
    isEdge.right && 'right',
    isStar && 'star',
    stone && 'occupied'
  ].filter(Boolean).join(' ')

  return (
    <div
      className={classNames}
      onClick={handleClick}
      data-row={row}
      data-col={col}
    >
      {stone && (
        <div className={`stone ${stone} new`} />
      )}
    </div>
  )
}

const GoBoard: React.FC<GoBoardProps> = ({ board, onIntersectionClick }) => {
  const boardSize = 5

  return (
    <div id="go-board-container">
      <div id="go-board">
        {board.map((row, rowIndex) =>
          row.map((stone, colIndex) => (
            <Intersection
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              stone={stone}
              onClick={onIntersectionClick}
              isEdge={{
                top: rowIndex === 0,
                bottom: rowIndex === boardSize - 1,
                left: colIndex === 0,
                right: colIndex === boardSize - 1
              }}
              isStar={rowIndex === 2 && colIndex === 2} // Center star point for 5x5
            />
          ))
        )}
      </div>
    </div>
  )
}

export default GoBoard
