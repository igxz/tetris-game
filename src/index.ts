import { TetrisRule } from './core/TetrisRule';
import { createRandomTetris } from './core/Tetris';
import { SquarePageViewer } from './core/viewer/SquarePageViewer';
import $ from 'jquery';
import { MoveDirection } from './core/types';

const tetris = createRandomTetris({ x: 3, y: 3 });

tetris.squares.forEach((square) => {
  square.viewer = new SquarePageViewer(square, $('#root'));
});

$('#btnDown').on('click', () => {
  TetrisRule.move(tetris, MoveDirection.DOWN);
});

$('#btnStraightDown').on('click', () => {
  TetrisRule.moveDirectly(tetris, MoveDirection.DOWN);
});


$('#btnLeft').on('click', () => {
  TetrisRule.move(tetris, MoveDirection.LEFT);
});

$('#btnRight').on('click', () => {
  TetrisRule.move(tetris, MoveDirection.RIGHT);
});

$('#btnRemove').on('click', () => {
  tetris.squares.forEach((sq) => {
    sq.viewer?.remove();
  });
});

$('#btnAdd').on('click', () => {
  tetris.squares.forEach((sq) => {
    sq.viewer = new SquarePageViewer(sq, $('#root'));
  });
});

$('#btnRotate').on('click', () => {
  TetrisRule.rotate(tetris);
});
