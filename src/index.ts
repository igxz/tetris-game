import { SquarePageViewer } from './core/viewer/SquarePageViewer';
import { Square } from './core/Square';
import $ from 'jquery';


const sq = new Square({ x: 3, y: 0 }, 'green');

const viewer = new SquarePageViewer(sq, $('#root'));

sq.viewer = viewer;

viewer.show();

$('#btnDown').on('click', () => {
  sq.point={
    x: sq.point.x,
    y: sq.point.y + 1
  }
});

$('#btnRemove').on('click', () => {
  sq.viewer?.remove();
});

$('#btnAdd').on('click', () => {
  sq.viewer = new SquarePageViewer(sq, $('#root'));
});

// setInterval(() => {
//   sq.point = {
//     x: sq.point.x + 1,
//     y: sq.point.y
//   }
// }, 1000);