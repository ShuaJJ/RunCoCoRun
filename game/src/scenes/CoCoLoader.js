import Phaser from 'phaser';
import playerCat from '../assets/player/cat/player_run.png';
import playerJumpCat from '../assets/player/cat/player_jump.png';
import playerFallingCat from '../assets/player/cat/player_falling.png';
import playerAttackCat from '../assets/player/cat/player_attack.png';
import playerDeadCat from '../assets/player/cat/player_dead.png';

import playerDog from '../assets/player/dog/player_run.png';
import playerJumpDog from '../assets/player/dog/player_jump.png';
import playerFallingDog from '../assets/player/dog/player_falling.png';
import playerAttackDog from '../assets/player/dog/player_attack.png';
import playerDeadDog from '../assets/player/dog/player_dead.png';

export default class CoCoLoad extends Phaser.Scene {
  constructor() {
    super('cocoLoader');
  }

  preload() {

    this.width = this.scale.width;
    this.height = this.scale.height;

    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(this.width / 2 - 160, this.height / 2 - 25, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        fontSize: '20px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        fontSize: '18px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const sprites = {
      Cat: {
        player: playerCat,
        player_jump: playerJumpCat,
        player_falling: playerFallingCat,
        player_attack: playerAttackCat,
        player_dead: playerDeadCat,
      },
      Dog: {
        player: playerDog,
        player_jump: playerJumpDog,
        player_falling: playerFallingDog,
        player_attack: playerAttackDog,
        player_dead: playerDeadDog,
      }
    }

    const k = this.game.config.cocoName;
    const sps = sprites[k];

    this.load.spritesheet('player', sps['player'], {
      frameWidth: 68.6,
      frameHeight: 60,
    });

    this.load.spritesheet('player_jump', sps['player_jump'], {
      frameWidth: 68.6,
      frameHeight: 60,
    });

    this.load.spritesheet('player_falling', sps['player_falling'], {
      frameWidth: 68.6,
      frameHeight: 60,
    });

    this.load.spritesheet('player_attack', sps['player_attack'], {
      frameWidth: 66.1,
      frameHeight: 60,
    });

    this.load.spritesheet('player_dead', sps['player_dead'], {
      frameWidth: 68.6,
      frameHeight: 60,
    });

    this.load.on('progress', (value) => {
      progressBar.clear();
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.fillStyle(0x00cccc, 1);
      progressBar.fillRect(625 - 150, 362.5 - 15, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });
  }

  create() {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', {
        start: 1,
        end: 8,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: 'dead',
      frames: this.anims.generateFrameNumbers('player_dead', {
        start: 1,
        end: 8,
      }),
      frameRate: 4,
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('player_jump', {
        start: 1,
        end: 8,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: 'falling',
      frames: this.anims.generateFrameNumbers('player_falling', {
        start: 1,
        end: 8,
      }),
      frameRate: 12,
    });

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('player_attack', {
        start: 1,
        end: 10,
      }),
      frameRate: 15,
    });

    this.scene.start('instructions');
  }
}
