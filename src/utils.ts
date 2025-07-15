/**
 * Utility functions for the MiniGo project
 */

export interface User {
  id: number;
  name: string;
  email: string;
}

export class Calculator {
  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  static factorial(n: number): number {
    if (n <= 1) return 1;
    return n * Calculator.factorial(n - 1);
  }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
}

export default {
  Calculator,
  formatDate,
  debounce
};
