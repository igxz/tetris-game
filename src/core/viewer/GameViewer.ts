import { GameStatus } from './../types';
import { Game } from '../Game';
import GameConfig from '../GameConfig';
import { SquareGroup } from '../SquareGroup';
import { GameViewer } from '../types';
import PageConfig from './PageConfig';
import { SquarePageViewer } from './SquarePageViewer';
import $ from 'jquery';

export class GamePageViewer implements GameViewer {
  private _panelDom = $('#panel');
  private _nextDom = $('#next');
  private _scoreDom = $('#score');
  private _levelDom = $('#level');
  private _msgDom = $('#message');

  init(game: Game): void {
    // setup the dimensions
    this._panelDom.css({
      width: GameConfig.panelSize.width * PageConfig.SquareSize.width,
      height: GameConfig.panelSize.height * PageConfig.SquareSize.height,
    });

    this._nextDom.css({
      width: GameConfig.nextSize.width * PageConfig.SquareSize.width,
      height: GameConfig.nextSize.height * PageConfig.SquareSize.height,
    });

    $(document).on('keydown', (e) => {
      console.log(e);
      if (e.code === 'ArrowDown') {
        game.controlDown();
      } else if (e.code === 'ArrowUp') {
        game.controlRotate();
      } else if (e.code === 'ArrowLeft') {
        game.controlLeft();
      } else if (e.code === 'ArrowRight') {
        game.controlRight();
      } else if (e.code === 'Space') {
        if (game.gameStatus === GameStatus.playing) {
          game.pause();
        } else {
          game.start();
        }
      }
    });
  }
  switch(tetris: SquareGroup): void {
    tetris.squares.forEach((square) => {
      square.viewer?.remove();
      square.viewer = new SquarePageViewer(square, this._panelDom);
    });
  }
  showNext(tetris: SquareGroup): void {
    tetris.squares.forEach((square) => {
      square.viewer = new SquarePageViewer(square, this._nextDom);
    });
  }

  updateScore(score: number, level: number): void {
    this._scoreDom.text(score);
    this._levelDom.text(`Level: ${level}`)
  }

  onGameStart(): void {
    this._msgDom.hide();
  }
  onGamePause(): void {
    this._msgDom.css({
      display: 'flex',
    });
    this._msgDom.find('p').html('游戏暂停');
  }
  onGameOver(): void {
    this._msgDom.css({
      display: 'flex',
    });
    this._msgDom.find('p').html('游戏结束');
  }
}
