import { Square } from './core/Square';
import { IViewer } from './core/types';

class SquareConsoleViewer implements IViewer {
  constructor(private square: Square) {}

  show(): void {
    console.log(this.square.point, this.square.color);
  }

  remove(): void {}
}

const sq = new Square({ x: 0, y: 0 }, 'red');

sq.viewer = new SquareConsoleViewer(sq);

sq.viewer.show();
