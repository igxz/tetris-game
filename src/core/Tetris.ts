import { SquareGroup } from './SquareGroup';
import { IPoint } from './types';
import { getRandomNumber } from './utils';

export class TShape extends SquareGroup {
  constructor(_centerPoint: IPoint, _color: string) {
    super(
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
      ],
      _centerPoint,
      _color
    );
  }
}

export class LShape extends SquareGroup {
  constructor(_centerPoint: IPoint, _color: string) {
    super(
      [
        { x: -2, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: -1 },
      ],
      _centerPoint,
      _color
    );
  }
}

export class LMirrorShape extends SquareGroup {
  constructor(_centerPoint: IPoint, _color: string) {
    super(
      [
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: -1 },
      ],
      _centerPoint,
      _color
    );
  }
}

export class SShape extends SquareGroup {
  constructor(_centerPoint: IPoint, _color: string) {
    super(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 1 },
      ],
      _centerPoint,
      _color
    );
  }

  rotate(): void {
    super.rotate();
    this._isClockwise = !this._isClockwise;
  }
}

export class SMirrorShape extends SquareGroup {
  constructor(_centerPoint: IPoint, _color: string) {
    super(
      [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      _centerPoint,
      _color
    );
  }

  rotate(): void {
    super.rotate();
    this._isClockwise = !this._isClockwise;
  }
}

export class SquareShape extends SquareGroup {
  constructor(_centerPoint: IPoint, _color: string) {
    super(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      _centerPoint,
      _color
    );
  }

  afterRotatedShape() {
    return this.shape;
  }
}

export class LineShape extends SquareGroup {
  constructor(_centerPoint: IPoint, _color: string) {
    super(
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      _centerPoint,
      _color
    );
  }

  rotate(): void {
    super.rotate();
    this._isClockwise = !this._isClockwise;
  }
}

export const shapes = [
  TShape,
  LShape,
  LMirrorShape,
  SShape,
  SMirrorShape,
  SquareShape,
  LineShape,
];

export const colors = ['red', 'yellow', 'green', 'orange'];

/**
 * 随机产生一个俄罗斯方块，颜色随机，形状随机
 * @param centerPoint
 */
export function createRandomTetris(centerPoint: IPoint): SquareGroup {
  let randomIndex = getRandomNumber(0, shapes.length);
  const shape = shapes[randomIndex];
  randomIndex = getRandomNumber(0, colors.length);
  const color = colors[randomIndex];
  return new shape(centerPoint, color);
}
