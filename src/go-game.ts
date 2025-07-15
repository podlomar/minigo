export type StoneColor = 'black' | 'white' | null;
export type Position = { row: number; col: number };

export interface GameState {
  board: StoneColor[][];
  currentPlayer: 'black' | 'white';
  capturedStones: { black: number; white: number };
  moveHistory: Move[];
  gameOver: boolean;
}

export interface Move {
  player: 'black' | 'white';
  position: Position | null; // null for pass
  moveNumber: number;
  capturedStones?: Position[];
}

export class GoGame {
  private boardSize = 5;
  private gameState: GameState;
  private boardElement: HTMLElement;
  private onStateChange?: (state: GameState) => void;

  constructor(boardElement: HTMLElement, onStateChange?: (state: GameState) => void) {
    this.boardElement = boardElement;
    this.onStateChange = onStateChange;
    this.gameState = this.initializeGame();
    this.renderBoard();
  }

  private initializeGame(): GameState {
    const board: StoneColor[][] = Array(this.boardSize)
      .fill(null)
      .map(() => Array(this.boardSize).fill(null));

    return {
      board,
      currentPlayer: 'black',
      capturedStones: { black: 0, white: 0 },
      moveHistory: [],
      gameOver: false
    };
  }

  private renderBoard(): void {
    this.boardElement.innerHTML = '';
    this.boardElement.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;
    this.boardElement.style.gridTemplateRows = `repeat(${this.boardSize}, 1fr)`;

    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const intersection = this.createIntersection(row, col);
        this.boardElement.appendChild(intersection);
      }
    }
  }

  private createIntersection(row: number, col: number): HTMLElement {
    const intersection = document.createElement('div');
    intersection.className = 'intersection';
    intersection.dataset.row = row.toString();
    intersection.dataset.col = col.toString();

    // Add edge classes for proper line rendering
    if (row === 0) intersection.classList.add('top');
    if (row === this.boardSize - 1) intersection.classList.add('bottom');
    if (col === 0) intersection.classList.add('left');
    if (col === this.boardSize - 1) intersection.classList.add('right');

    // Add star point for center (2,2 on 5x5 board)
    if (row === 2 && col === 2) intersection.classList.add('star');

    // Add click handler
    intersection.addEventListener('click', () => this.handleIntersectionClick(row, col));

    // Render stone if present
    const stone = this.gameState.board[row][col];
    if (stone) {
      this.placeStoneOnIntersection(intersection, stone);
    }

    return intersection;
  }

  private placeStoneOnIntersection(intersection: HTMLElement, color: StoneColor, isNew = false): void {
    if (!color) return;

    intersection.classList.add('occupied');
    const stone = document.createElement('div');
    stone.className = `stone ${color}`;
    if (isNew) stone.classList.add('new');

    intersection.appendChild(stone);
  }

  private handleIntersectionClick(row: number, col: number): void {
    if (this.gameState.gameOver) return;
    if (this.gameState.board[row][col] !== null) return; // Position occupied

    if (this.isValidMove(row, col)) {
      this.makeMove(row, col);
    }
  }

  private isValidMove(row: number, col: number): boolean {
    // For simplicity, we'll implement basic Go rules
    // In a full implementation, you'd check for ko rule, suicide rule, etc.
    return this.gameState.board[row][col] === null;
  }

  private makeMove(row: number, col: number): void {
    // Place stone
    this.gameState.board[row][col] = this.gameState.currentPlayer;

    // Check for captures
    const capturedStones = this.checkCaptures(row, col);

    // Create move record
    const move: Move = {
      player: this.gameState.currentPlayer,
      position: { row, col },
      moveNumber: this.gameState.moveHistory.length + 1,
      capturedStones
    };

    this.gameState.moveHistory.push(move);

    // Update captured count
    if (capturedStones && capturedStones.length > 0) {
      const opponentColor = this.gameState.currentPlayer === 'black' ? 'white' : 'black';
      this.gameState.capturedStones[opponentColor] += capturedStones.length;
    }

    // Switch players
    this.gameState.currentPlayer = this.gameState.currentPlayer === 'black' ? 'white' : 'black';

    // Re-render board
    this.renderBoard();

    // Notify state change
    if (this.onStateChange) {
      this.onStateChange(this.gameState);
    }
  }

  private checkCaptures(row: number, col: number): Position[] {
    const capturedStones: Position[] = [];
    const opponentColor = this.gameState.currentPlayer === 'black' ? 'white' : 'black';

    // Check all adjacent positions for opponent groups without liberties
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    for (const [dr, dc] of directions) {
      const adjRow = row + dr;
      const adjCol = col + dc;

      if (this.isInBounds(adjRow, adjCol) &&
        this.gameState.board[adjRow][adjCol] === opponentColor) {

        const group = this.getGroup(adjRow, adjCol);
        if (this.getGroupLiberties(group).length === 0) {
          // Capture the group
          for (const pos of group) {
            this.gameState.board[pos.row][pos.col] = null;
            capturedStones.push(pos);
          }
        }
      }
    }

    return capturedStones;
  }

  private getGroup(row: number, col: number): Position[] {
    const color = this.gameState.board[row][col];
    if (!color) return [];

    const group: Position[] = [];
    const visited = new Set<string>();
    const stack = [{ row, col }];

    while (stack.length > 0) {
      const pos = stack.pop()!;
      const key = `${pos.row},${pos.col}`;

      if (visited.has(key)) continue;
      visited.add(key);

      if (this.isInBounds(pos.row, pos.col) &&
        this.gameState.board[pos.row][pos.col] === color) {
        group.push(pos);

        // Add adjacent positions to stack
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dr, dc] of directions) {
          stack.push({ row: pos.row + dr, col: pos.col + dc });
        }
      }
    }

    return group;
  }

  private getGroupLiberties(group: Position[]): Position[] {
    const liberties: Position[] = [];
    const libertiesSet = new Set<string>();

    for (const pos of group) {
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, dc] of directions) {
        const adjRow = pos.row + dr;
        const adjCol = pos.col + dc;
        const key = `${adjRow},${adjCol}`;

        if (this.isInBounds(adjRow, adjCol) &&
          this.gameState.board[adjRow][adjCol] === null &&
          !libertiesSet.has(key)) {
          liberties.push({ row: adjRow, col: adjCol });
          libertiesSet.add(key);
        }
      }
    }

    return liberties;
  }

  private isInBounds(row: number, col: number): boolean {
    return row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize;
  }

  public pass(): void {
    if (this.gameState.gameOver) return;

    const move: Move = {
      player: this.gameState.currentPlayer,
      position: null,
      moveNumber: this.gameState.moveHistory.length + 1
    };

    this.gameState.moveHistory.push(move);
    this.gameState.currentPlayer = this.gameState.currentPlayer === 'black' ? 'white' : 'black';

    // Check if both players passed (simplified end condition)
    const lastTwoMoves = this.gameState.moveHistory.slice(-2);
    if (lastTwoMoves.length === 2 &&
      lastTwoMoves.every(move => move.position === null)) {
      this.gameState.gameOver = true;
    }

    if (this.onStateChange) {
      this.onStateChange(this.gameState);
    }
  }

  public newGame(): void {
    this.gameState = this.initializeGame();
    this.renderBoard();
    if (this.onStateChange) {
      this.onStateChange(this.gameState);
    }
  }

  public getGameState(): GameState {
    return { ...this.gameState };
  }

  public canUndo(): boolean {
    return this.gameState.moveHistory.length > 0;
  }

  public undo(): void {
    if (!this.canUndo()) return;

    // Remove last move
    const lastMove = this.gameState.moveHistory.pop()!;

    if (lastMove.position) {
      // Remove the stone that was placed
      this.gameState.board[lastMove.position.row][lastMove.position.col] = null;

      // Restore captured stones if any
      if (lastMove.capturedStones) {
        const opponentColor = lastMove.player === 'black' ? 'white' : 'black';
        for (const pos of lastMove.capturedStones) {
          this.gameState.board[pos.row][pos.col] = opponentColor;
        }
        this.gameState.capturedStones[opponentColor] -= lastMove.capturedStones.length;
      }
    }

    // Switch back to previous player
    this.gameState.currentPlayer = lastMove.player;
    this.gameState.gameOver = false;

    this.renderBoard();
    if (this.onStateChange) {
      this.onStateChange(this.gameState);
    }
  }
}
