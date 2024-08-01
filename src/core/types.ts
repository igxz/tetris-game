import { SquareGroup } from './SquareGroup';

export interface IPoint {
  readonly x: number;
  readonly y: number;
}

export interface IViewer {
  /**
   * 显示
   */
  show(): void;

  /**
   * 移除，不再显示
   */
  remove(): void;
}

export type Shape = IPoint[];

export enum MoveDirection {
  LEFT,
  RIGHT,
  DOWN,
}

export enum GameStatus {
  init,
  playing,
  pause,
  over,
}

export interface GameViewer {
  switch(tetris: SquareGroup): void;
  showNext(tetris: SquareGroup): void;
}
