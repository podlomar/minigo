import './style.css'
import { Calculator, formatDate } from './utils.js'

class App {
  private clickCount = 0;
  private clickButton: HTMLButtonElement;
  private counterElement: HTMLElement;

  constructor() {
    this.clickButton = document.getElementById('clickBtn') as HTMLButtonElement;
    this.counterElement = document.getElementById('counter') as HTMLElement;

    this.init();
  }

  private init(): void {
    this.clickButton.addEventListener('click', () => this.handleClick());
    this.updateCounter();

    // Demonstrate TypeScript utilities
    const today = formatDate(new Date());
    const factorial5 = Calculator.factorial(5);

    console.log('🚀 MiniGo app initialized!');
    console.log(`📅 Today is: ${today}`);
    console.log(`🔢 5! = ${factorial5}`);
  }

  private handleClick(): void {
    this.clickCount++;
    this.updateCounter();

    // Add some visual feedback
    this.clickButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.clickButton.style.transform = 'scale(1)';
    }, 100);
  }

  private updateCounter(): void {
    this.counterElement.textContent = `Clicks: ${this.clickCount}`;
  }

  public getClickCount(): number {
    return this.clickCount;
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});

// Example of exporting for potential use in other modules
export { App };
