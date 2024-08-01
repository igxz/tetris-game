import { SquareGroup } from './SquareGroup';
import { createRandomTetris } from './Tetris';
import { TetrisRule } from './TetrisRule';
import { GameStatus, GameViewer, MoveDirection } from './types';
import GameConfig from './GameConfig';
import { Square } from './Square';

export class Game {
  private _gameStatus: GameStatus = GameStatus.init;

  // current play tetris
  private _currentTetris?: SquareGroup;

  // next tettris
  private _nextTetris: SquareGroup = createRandomTetris({ x: 0, y: 0 });

  private _timer?: number;

  // auto drop time speed
  private _duration: number = 1000;

  // all existing squares in playing game
  private _existSquares : Square[] = [];

  constructor(private _viewer: GameViewer) {
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris);
    this._viewer.showNext(this._nextTetris);
  }

  /**
   * start a new game
   */
  start() {
    if (this._gameStatus === GameStatus.playing) {
      return;
    } else {
      this._gameStatus = GameStatus.playing;
      if (!this._currentTetris) {
        this.switchTetris();
      }
      this.autoDrop();
    }
  }

  pause() {
    if(this._gameStatus == GameStatus.playing){
        this._gameStatus = GameStatus.pause;
        clearInterval(this._timer);
        this._timer = undefined;
    }
  }

  controlLeft(){
    if(this._currentTetris && this._gameStatus == GameStatus.playing){
        TetrisRule.move(this._currentTetris, MoveDirection.LEFT, this._existSquares);
    }
  }

  controlRight(){
    if(this._currentTetris && this._gameStatus == GameStatus.playing){
        TetrisRule.move(this._currentTetris, MoveDirection.RIGHT, this._existSquares);
    }
  }

  controlDown(){
    if(this._currentTetris && this._gameStatus == GameStatus.playing){
        TetrisRule.moveDirectly(this._currentTetris, MoveDirection.DOWN, this._existSquares);
        // hit the bottom
        this.hitBottom();
    }
  }

  controlRotate(){
    if(this._currentTetris && this._gameStatus == GameStatus.playing){
        TetrisRule.rotate(this._currentTetris, this._existSquares);
    }
  }

  private autoDrop() {
    if (this._timer || this._gameStatus !== GameStatus.playing) {
      return;
    }
    this._timer = setInterval(() => {
      if (this._currentTetris) {
        if(!TetrisRule.move(this._currentTetris, MoveDirection.DOWN, this._existSquares)){
            // hit the bottom
            this.hitBottom();
        }
      }
    }, this._duration);
  }

  private switchTetris() {
    this._currentTetris = this._nextTetris;
    this.resetCenterPoint(GameConfig.panelSize.width, this._currentTetris);
    this._nextTetris = createRandomTetris({ x: 0, y: 0 });
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris);
    this._viewer.switch(this._currentTetris);
    this._viewer.showNext(this._nextTetris);
  }

  /**
   * 设置中心点坐标，已达到让该方块出现在区域的中上方
   * @param width
   * @param teris
   */
  private resetCenterPoint(width: number, teris: SquareGroup) {
    const x = Math.ceil(width / 2) - 1;
    const y = 0;
    teris.centerPoint = { x, y };
    while (teris.squares.some((it) => it.point.y < 0)) {
      teris.squares.forEach(
        (sq) =>
          (sq.point = {
            x: sq.point.x,
            y: sq.point.y + 1,
          })
      );
    }
  }

  private hitBottom() {
    // add all squares of tetris to exising squares
    this._existSquares = this._existSquares.concat(this._currentTetris!.squares);
    // clean line(s)
    const num = TetrisRule.deleteSquares(this._existSquares);
    // switch tetris
    this.switchTetris();
  }
}
