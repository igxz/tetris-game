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
  private _nextTetris!: SquareGroup;

  private _timer?: number;

  // auto drop time speed
  private _duration: number;

  // all existing squares in playing game
  private _existSquares: Square[] = [];

  private _score: number = 0;

  private _currentLevel: number = 1;

  get score(): number {
    return this._score;
  }

  set score(val) {
    this._score = val;
    this._viewer.updateScore(this._score, this._currentLevel);
  }

  get gameStatus() {
    return this._gameStatus;
  }

  constructor(private _viewer: GameViewer) {
    this.createNext();
    this._viewer.init(this);
    this._viewer.updateScore(this.score, this._currentLevel);
    this._duration = GameConfig.levels[0].interval;
  }

  private createNext() {
    this._nextTetris = createRandomTetris({ x: 0, y: 0 });
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris);
    this._viewer.showNext(this._nextTetris);
  }

  private init() {
    this._existSquares.forEach((sq) => {
      if (sq.viewer) {
        sq.viewer.remove();
      }
    });
    this._existSquares = [];
    this.createNext();
    this._currentTetris = undefined;
    this.score = 0;
  }

  /**
   * start a new game
   */
  start() {
    if (this._gameStatus === GameStatus.playing) {
      return;
    }

    // from a ended game to a new game
    if (this._gameStatus === GameStatus.over) {
      this.init();
    }

    this._gameStatus = GameStatus.playing;

    if (!this._currentTetris) {
      this.switchTetris();
    }

    this.autoDrop();
    this._viewer.onGameStart();
  }

  pause() {
    if (this._gameStatus === GameStatus.playing) {
      this._gameStatus = GameStatus.pause;
      clearInterval(this._timer);
      this._timer = undefined;
      this._viewer.onGamePause();
    }
  }

  controlLeft() {
    if (this._currentTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.move(
        this._currentTetris,
        MoveDirection.LEFT,
        this._existSquares
      );
    }
  }

  controlRight() {
    if (this._currentTetris && this._gameStatus == GameStatus.playing) {
      TetrisRule.move(
        this._currentTetris,
        MoveDirection.RIGHT,
        this._existSquares
      );
    }
  }

  controlDown() {
    if (this._currentTetris && this._gameStatus == GameStatus.playing) {
      TetrisRule.moveDirectly(
        this._currentTetris,
        MoveDirection.DOWN,
        this._existSquares
      );
      // hit the bottom
      this.hitBottom();
    }
  }

  controlRotate() {
    if (this._currentTetris && this._gameStatus == GameStatus.playing) {
      TetrisRule.rotate(this._currentTetris, this._existSquares);
    }
  }

  private autoDrop() {
    if (this._timer || this._gameStatus !== GameStatus.playing) {
      return;
    }
    this._timer = setInterval(() => {
      if (this._currentTetris) {
        if (
          !TetrisRule.move(
            this._currentTetris,
            MoveDirection.DOWN,
            this._existSquares
          )
        ) {
          // hit the bottom
          this.hitBottom();
        }
      }
    }, this._duration);
  }

  private switchTetris() {
    this._currentTetris = this._nextTetris;
    this._currentTetris.squares.forEach((sq) => {
      if (sq.viewer) {
        sq.viewer.remove();
      }
    });

    this.resetCenterPoint(GameConfig.panelSize.width, this._currentTetris);

    if (
      !TetrisRule.canIMove(
        this._currentTetris.shape,
        this._currentTetris.centerPoint,
        this._existSquares
      )
    ) {
      // Gameover
      this._gameStatus = GameStatus.over;
      clearInterval(this._timer);
      this._timer = undefined;
      this._viewer.onGameOver();
      return;
    }

    this.createNext();
    this._viewer.switch(this._currentTetris);
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
      teris.centerPoint = {
        x: teris.centerPoint.x,
        y: teris.centerPoint.y + 1,
      };
    }
  }

  private hitBottom() {
    // add all squares of tetris to exising squares
    this._existSquares = this._existSquares.concat(
      this._currentTetris!.squares
    );
    // clean line(s)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const num = TetrisRule.deleteSquares(this._existSquares);

    this.addScore(num);

    // switch tetris
    this.switchTetris();
  }

  private addScore(lineNum: number) {
    if (lineNum === 0) {
      return;
    } else if (lineNum === 1) {
      this.score += 10;
    } else if (lineNum === 2) {
      this.score += 20;
    } else if (lineNum === 3) {
      this.score += 40;
    } else if (lineNum === 4) {
      this.score += 100;
    }

    // check the level
    this.checkLevel(this.score);
  }

  private checkLevel(score: number) {
    const nextLevel = GameConfig.levels.find(
      (level) => score >= level.minScore && this._currentLevel < level.level
    );

    if (nextLevel) {
      this._currentLevel = nextLevel.level;
      this._duration = nextLevel.interval;
      clearInterval(this._timer);
      this._timer = undefined;
      this.autoDrop();
    }
  }
}
