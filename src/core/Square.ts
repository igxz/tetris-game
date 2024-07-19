import { IPoint, IViewer } from './types';

/**
 * 小方块
 */
export class Square {
  private _point: IPoint;
  private _color: string;
  private _viewer?: IViewer;

  constructor(_point: IPoint, _color: string) {
    this._point = _point;
    this._color = _color;
  }

  get point() {
    return this._point;
  }

  set point(value) {
    this._point = value;
    // 完成显示
    if(this._viewer){
        this._viewer.show();
    }
  }

  get color() {
    return this._color;
  }

  get viewer() {
    return this._viewer;
  }

  set viewer(value) {
    this._viewer = value;
    this._viewer?.show();
  }
}

const s = new Square({ x: 0, y: 2 }, 'blue');
