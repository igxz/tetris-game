import { IViewer } from '../types';
import { Square } from './../Square';
import pageConfig from './PageConfig';
import $ from 'jquery';

export class SquarePageViewer implements IViewer {
  private _dom?: JQuery<HTMLElement>;
  private _isRemoved: boolean = false; // 是否已经移除

  constructor(
    private _square: Square,
    private _container: JQuery<HTMLElement>
  ) {}

  show(): void {
    if (this._isRemoved) {
      return;
    }
    if (!this._dom) {
      this._dom = $('<div>')
        .css({
          position: 'absolute',
          width: pageConfig.SquareSize.width,
          height: pageConfig.SquareSize.height,
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        })
        .appendTo(this._container);
    }
    this._dom.css({
      left: this._square.point.x * pageConfig.SquareSize.width,
      top: this._square.point.y * pageConfig.SquareSize.height,
      backgroundColor: this._square.color,
    });
  }

  remove(): void {
    if (this._dom && !this._isRemoved) {
      this._dom.remove();
      this._isRemoved = true;
    }
  }
}
