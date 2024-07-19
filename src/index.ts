import { SquareGroup } from './core/SquareGroup';
import { SquarePageViewer } from './core/viewer/SquarePageViewer';
import { Square } from './core/Square';
import $ from 'jquery';

const squareG = new SquareGroup(
  [
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
  ],
  { x: 5, y: 5 },
  'red'
);

squareG.squares.forEach((square) => {
  square.viewer = new SquarePageViewer(square, $('#root'));
});

// const sq = new Square({ x: 3, y: 0 }, 'green');
// const viewer = new SquarePageViewer(sq, $('#root'));
// sq.viewer = viewer;
// viewer.show();

$('#btnUp').on('click', () => {
  squareG.centerPoint = {
    x: squareG.centerPoint.x,
    y: squareG.centerPoint.y - 1,
  };
});

$('#btnDown').on('click', () => {
  squareG.centerPoint = {
    x: squareG.centerPoint.x,
    y: squareG.centerPoint.y + 1,
  };
});


$('#btnLeft').on('click', () => {
  squareG.centerPoint = {
    x: squareG.centerPoint.x - 1,
    y: squareG.centerPoint.y,
  };
});


$('#btnRight').on('click', () => {
  squareG.centerPoint = {
    x: squareG.centerPoint.x+1,
    y: squareG.centerPoint.y,
  };
});

$('#btnRemove').on('click', () => {
  squareG.squares.forEach((sq) => {
    sq.viewer?.remove();
  });
});

$('#btnAdd').on('click', () => {
  squareG.squares.forEach((sq) => {
    sq.viewer = new SquarePageViewer(sq, $('#root'));
  });
});
