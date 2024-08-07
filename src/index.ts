import { Game } from './core/Game';
import { GamePageViewer } from './core/viewer/GameViewer';

const viewer = new GamePageViewer();
new Game(viewer);

