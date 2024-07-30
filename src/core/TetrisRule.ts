import { Shape, IPoint, MoveDirection } from './types';
import GameConfig from './GameConfig';
import { SquareGroup } from './SquareGroup';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPoint(obj: any): obj is IPoint {
  if (typeof obj.x === 'undefined') {
    return false;
  }
  return true;
}

/**
 * 该类中提供一系列的函数，根据游戏规则判断各种情况
 */
export class TetrisRule {
  /**
   * 判断某个形状的方块，是否能够移动到目标位置
   */
  static canIMove(shape: Shape, targetPoint: IPoint): boolean {
    //假设，中心点已经移动到了目标位置，算出每个小方块的坐标
    const targetSquarePoints: IPoint[] = shape.map((it) => {
      return {
        x: it.x + targetPoint.x,
        y: it.y + targetPoint.y,
      };
    });
    //边界判断
    const result = targetSquarePoints.some((p) => {
      //是否超出了边界
      return (
        p.x < 0 ||
        p.x > GameConfig.panelSize.width - 1 ||
        p.y < 0 ||
        p.y > GameConfig.panelSize.height - 1
      );
    });
    if (result) {
      return false;
    }
    return true;
  }

  static move(teris: SquareGroup, targetPoint: IPoint): boolean;
  static move(teris: SquareGroup, direction: MoveDirection): boolean;
  static move(
    teris: SquareGroup,
    targetPointOrDirection: IPoint | MoveDirection
  ): boolean {
    if (isPoint(targetPointOrDirection)) {
      if (this.canIMove(teris.shape, targetPointOrDirection)) {
        teris.centerPoint = targetPointOrDirection;
        return true;
      }
      return false;
    } else {
      const direction = targetPointOrDirection;
      let targetPoint: IPoint;
      if (direction === MoveDirection.DOWN) {
        targetPoint = {
          x: teris.centerPoint.x,
          y: teris.centerPoint.y + 1,
        };
      } else if (direction === MoveDirection.LEFT) {
        targetPoint = {
          x: teris.centerPoint.x - 1,
          y: teris.centerPoint.y,
        };
      } else {
        targetPoint = {
          x: teris.centerPoint.x + 1,
          y: teris.centerPoint.y,
        };
      }
      return this.move(teris, targetPoint);
    }
  }

  /**
   * 将当前的方块，移动到目标方向的终点
   * @param teris
   * @param direction
   */
  static moveDirectly(teris: SquareGroup, direction: MoveDirection) {
    while (this.move(teris, direction)) { /* empty */ }
  }

  /**
   * 顺时针转动方块
   * @param tetris
   */
  static rotate(tetris: SquareGroup): boolean {
    const newShape = tetris.afterRotatedShape();
    if (this.canIMove(newShape, tetris.centerPoint)) {
      tetris.rotate();
      return true;
    } else {
      return false;
    }
  }
}
