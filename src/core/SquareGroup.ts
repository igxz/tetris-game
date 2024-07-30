import { Square } from './Square';
import { IPoint, Shape } from './types';

export class SquareGroup {
  private _squares: readonly Square[];
  protected _isClockwise = true;

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
    this._refreshShape();
  }

  get shape() {
    return this._shape;
  }

  set shape(value) {
    this._shape = value;
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

    this._refreshShape();
  }

  afterRotatedShape(): Shape {
    if (this._isClockwise) {
      const newShape = this._shape.map((p) => {
        const newPoint: IPoint = {
          x: -p.y,
          y: p.x,
        };
        return newPoint;
      });
      return newShape;
    } else {
      const newShape = this._shape.map((p) => {
        const newPoint: IPoint = {
          x: p.y,
          y: -p.x,
        };
        return newPoint;
      });
      return newShape;
    }
  }

  rotate() {
    this._shape = this.afterRotatedShape();
    this._refreshShape();
  }

  private _refreshShape() {
    this._shape.forEach((p, i) => {
      this._squares[i].point = {
        x: this._centerPoint.x + p.x,
        y: this._centerPoint.y + p.y,
      };
    });
  }
}
