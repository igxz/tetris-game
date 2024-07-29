import { SquareGroup } from './SquareGroup';
import { IPoint, Shape } from './types';
import { getRandomNumber } from './utils';

export const TShape: Shape = [
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
];

export const LShape: Shape = [
  { x: -2, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: -1 },
];

export const LMirrorShape: Shape = [
  { x: 2, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: -1 },
];

export const SShape: Shape = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
];

export const SMirrorShape: Shape = [
  { x: 0, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

export const SquareShape: Shape = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

export const LineShape: Shape = [
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
];

export const shapes: Shape[] = [
  TShape,
  LShape,
  LMirrorShape,
  SShape,
  SMirrorShape,
  SquareShape,
  LineShape,
];

export const colors = ['red', 'yellow', 'green', '#fff', 'orange'];

/**
 * 随机产生一个俄罗斯方块，颜色随机，形状随机
 * @param centerPoint
 */
export function createRandomTetris(centerPoint: IPoint) {
  let randomIndex = getRandomNumber(0, shapes.length);
  const shape = shapes[randomIndex];
  randomIndex = getRandomNumber(0, colors.length);
  const color = colors[randomIndex];
  return new SquareGroup(shape, centerPoint, color);
}
