import Phaser from 'phaser';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import './css/main.css';
import Game from './scenes/Game';
import Boot from './scenes/Boot';
import PreLoader from './scenes/PreLoader';
import titleScene from './scenes/TitleScene';
import cocoSelectScene from './scenes/CoCoSelectScene';
import CoCoLoad from './scenes/CoCoLoader';
import instructions from './scenes/InstructionsScene';
import gameover from './scenes/GameOver';
import credit from './scenes/Credits';
import playAgain from './scenes/playAgain';
import leaderboardScene from './scenes/LeaderboardScene';
import leaderboardTable from './scenes/LeaderboardTable';

window.onload = () => {
  const config = {
    type: Phaser.AUTO,
    parent: 'divId',
    width: 1250,
    height: 725,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
    dom: {
      createContainer: true,
    },
    // eslint-disable-next-line max-len
    scene: [Boot, PreLoader, titleScene, cocoSelectScene, CoCoLoad, instructions, Game, gameover, leaderboardScene, leaderboardTable, credit, playAgain],
    plugins: {
      scene: [{
          key: 'rexUI',
          plugin: UIPlugin,
          mapping: 'rexUI'
      },
      // ...
      ]
    },
  };

  // eslint-disable-next-line no-unused-vars
  const game = new Phaser.Game(config);

  window.focus();
};
