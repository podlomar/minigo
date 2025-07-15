import './style.css'
import { GoGame, GameState } from './go-game.js'

class App {
  private goGame: GoGame;
  private playerIndicator: HTMLElement;
  private blackCapturedElement: HTMLElement;
  private whiteCapturedElement: HTMLElement;
  private movesListElement: HTMLElement;
  private newGameButton: HTMLButtonElement;
  private passButton: HTMLButtonElement;
  private undoButton: HTMLButtonElement;

  constructor() {
    const boardElement = document.getElementById('go-board') as HTMLElement;
    this.playerIndicator = document.getElementById('player-indicator') as HTMLElement;
    this.blackCapturedElement = document.getElementById('black-captured') as HTMLElement;
    this.whiteCapturedElement = document.getElementById('white-captured') as HTMLElement;
    this.movesListElement = document.getElementById('moves-list') as HTMLElement;
    this.newGameButton = document.getElementById('new-game') as HTMLButtonElement;
    this.passButton = document.getElementById('pass-turn') as HTMLButtonElement;
    this.undoButton = document.getElementById('undo-move') as HTMLButtonElement;

    this.goGame = new GoGame(boardElement, (state) => this.onGameStateChange(state));
    this.init();
  }

  private init(): void {
    // Set up button event listeners
    this.newGameButton.addEventListener('click', () => this.goGame.newGame());
    this.passButton.addEventListener('click', () => this.goGame.pass());
    this.undoButton.addEventListener('click', () => this.goGame.undo());

    // Initialize UI with current game state
    this.onGameStateChange(this.goGame.getGameState());

    console.log('🔴⚫ MiniGo initialized! Ready to play Go!');
  }

  private onGameStateChange(state: GameState): void {
    this.updatePlayerIndicator(state.currentPlayer);
    this.updateCapturedStones(state.capturedStones);
    this.updateMoveHistory(state.moveHistory);
    this.updateButtons(state);
  }

  private updatePlayerIndicator(currentPlayer: 'black' | 'white'): void {
    const symbol = currentPlayer === 'black' ? '⚫' : '⚪';
    const playerName = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);

    this.playerIndicator.textContent = `${symbol} ${playerName}`;
    this.playerIndicator.className = `player ${currentPlayer}`;
  }

  private updateCapturedStones(capturedStones: { black: number; white: number }): void {
    this.blackCapturedElement.textContent = capturedStones.black.toString();
    this.whiteCapturedElement.textContent = capturedStones.white.toString();
  }

  private updateMoveHistory(moveHistory: any[]): void {
    this.movesListElement.innerHTML = '';

    if (moveHistory.length === 0) {
      this.movesListElement.innerHTML = '<div style="opacity: 0.6; font-style: italic;">No moves yet</div>';
      return;
    }

    moveHistory.forEach(move => {
      const moveEntry = document.createElement('div');
      moveEntry.className = 'move-entry';

      const moveNumber = document.createElement('span');
      moveNumber.className = 'move-number';
      moveNumber.textContent = `${move.moveNumber}.`;

      const movePlayer = document.createElement('span');
      movePlayer.className = 'move-player';
      const symbol = move.player === 'black' ? '⚫' : '⚪';

      if (move.position) {
        const pos = String.fromCharCode(65 + move.position.col) + (move.position.row + 1);
        movePlayer.textContent = `${symbol} ${pos}`;
        if (move.capturedStones && move.capturedStones.length > 0) {
          movePlayer.textContent += ` (${move.capturedStones.length} captured)`;
        }
      } else {
        movePlayer.textContent = `${symbol} Pass`;
      }

      moveEntry.appendChild(moveNumber);
      moveEntry.appendChild(movePlayer);
      this.movesListElement.appendChild(moveEntry);
    });

    // Scroll to bottom
    this.movesListElement.scrollTop = this.movesListElement.scrollHeight;
  }

  private updateButtons(state: GameState): void {
    this.undoButton.disabled = !this.goGame.canUndo();
    this.passButton.disabled = state.gameOver;

    if (state.gameOver) {
      this.newGameButton.textContent = 'New Game';
      this.newGameButton.style.background = 'linear-gradient(135deg, #e53e3e, #c53030)';
    } else {
      this.newGameButton.textContent = 'Reset';
      this.newGameButton.style.background = 'linear-gradient(135deg, #4a5568, #2d3748)';
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});

// Example of exporting for potential use in other modules
export { App };
