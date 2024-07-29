import { Square } from './Square';
import { IPoint, Shape } from './types';

export class SquareGroup {
  private _squares: readonly Square[];

  constructor(
    private _shape: Shape,
    private _centerPoint: IPoint,
    private _color: string
  ) {
    // 设置小方块数组
    const arr: Square[] = [];
    this._shape.forEach((p) => {
      const sq = new Square(
        { x: this._centerPoint.x + p.x, y: this._centerPoint.y + p.y },
        this._color
      );
      arr.push(sq);
    });
    this._squares = arr;
  }

  get shape() {
    return this._shape;
  }

  get squares() {
    return this._squares;
  }

  get centerPoint() {
    return this._centerPoint;
  }

  set centerPoint(value) {
    this._centerPoint = value;
    //同时设置所有小方块对象的坐标

    this._shape.forEach((p, i) => {
      this._squares[i].point = {
        x: this._centerPoint.x + p.x,
        y: this._centerPoint.y + p.y,
      };
    });
  }
}
