import { createRandomTetris } from './core/Tetris';
import { SquarePageViewer } from './core/viewer/SquarePageViewer';
import $ from 'jquery';

const tetris = createRandomTetris({x: 3, y:3});

tetris.squares.forEach((square) => {
  square.viewer = new SquarePageViewer(square, $('#root'));
});

// const sq = new Square({ x: 3, y: 0 }, 'green');
// const viewer = new SquarePageViewer(sq, $('#root'));
// sq.viewer = viewer;
// viewer.show();

$('#btnUp').on('click', () => {
  tetris.centerPoint = {
    x: tetris.centerPoint.x,
    y: tetris.centerPoint.y - 1,
  };
});

$('#btnDown').on('click', () => {
  tetris.centerPoint = {
    x: tetris.centerPoint.x,
    y: tetris.centerPoint.y + 1,
  };
});

$('#btnLeft').on('click', () => {
  tetris.centerPoint = {
    x: tetris.centerPoint.x - 1,
    y: tetris.centerPoint.y,
  };
});

$('#btnRight').on('click', () => {
  tetris.centerPoint = {
    x: tetris.centerPoint.x + 1,
    y: tetris.centerPoint.y,
  };
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
