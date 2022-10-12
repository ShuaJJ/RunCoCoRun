import Phaser from 'phaser';
import background from '../assets/background/Background 1.png';
import bgTree1 from '../assets/background/BGTrees 2.png';
import lights1 from '../assets/background/Lights 3.png';
import bgTree2 from '../assets/background/BGTrees 4.png';
import bgTree3 from '../assets/background/BGTrees 5.png';
import lights2 from '../assets/background/Lights 6.png';
import floor from '../assets/background/Floor 9.png';
import playerRestCat from '../assets/player/cat/player_rest.png';
import playerRestDog from '../assets/player/dog/player_rest.png';
import platform from '../assets/platform.png';
import playBtn from '../assets/buttons/play.png';
import exitBtn from '../assets/buttons/exit.png';
import playRed from '../assets/buttons/red/play.png';
import exitRed from '../assets/buttons/red/exit.png';
import playPressed from '../assets/buttons/pressed/play.png';
import exitPressed from '../assets/buttons/pressed/exit.png';
import skeletonAttack from '../assets/monsters/skeleton/Skeleton Attack.png';
import skeletonWalk from '../assets/monsters/skeleton/Skeleton Walk.png';
import skeletonDead from '../assets/monsters/skeleton/Skeleton Dead.png';
import menu from '../assets/music/intro.mp3';
import gameMusic from '../assets/music/game.mp3';
import ending from '../assets/music/ending.mp3';
import spikeCollection from '../assets/obstacle/spike collection.png';
import instructionBg from '../assets/paperbackground.png';
import loadFont from '../javascript/fontLoader';
import deathSound from '../assets/sound effects/death.mp3';
import gameover from '../assets/sound effects/gameover.mp3';
import monogram from '../assets/font/monogram_extended.ttf';

export default class PreLoad extends Phaser.Scene {
  constructor() {
    super('preLoader');
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
    this.sound.pauseOnBlur = false;
    this.scene.pauseOnBlur = false;
    loadFont('Monogram', monogram);

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

    this.load.image('background', background);
    this.load.image('bgTree_1', bgTree1);
    this.load.image('lights_1', lights1);
    this.load.image('lights_2', lights2);
    this.load.image('bgTree_2', bgTree2);
    this.load.image('bgTree_3', bgTree3);
    this.load.image('floor', floor);
    this.load.image('platform', platform);

    this.load.image('play', playBtn);
    this.load.image('exit', exitBtn);
    this.load.image('play_red', playRed);
    this.load.image('exit_red', exitRed);
    this.load.image('playPressed', playPressed);
    this.load.image('exitPressed', exitPressed);

    this.load.image('instructions_bg', instructionBg);

    this.load.image('spike', spikeCollection);

    this.load.spritesheet('player_rest_cat', playerRestCat, {
      frameWidth: 68.6,
      frameHeight: 60,
    });

    this.load.spritesheet('player_rest_dog', playerRestDog, {
      frameWidth: 68.2,
      frameHeight: 60,
    });

    this.load.spritesheet('skeleton_walk', skeletonWalk, {
      frameWidth: 45.4,
      frameHeight: 68,
    });

    this.load.spritesheet('skeleton_attack', skeletonAttack, {
      frameWidth: 91.6,
      frameHeight: 79,
    });

    this.load.spritesheet('skeleton_dead', skeletonDead, {
      frameWidth: 69.85,
      frameHeight: 69,
    });

    this.load.audio('menu', menu);
    this.load.audio('gameMusic', gameMusic);
    this.load.audio('ending', ending);
    this.load.audio('death_sound', deathSound);
    this.load.audio('gameover', gameover);

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
      key: 'rest_cat',
      frames: this.anims.generateFrameNumbers('player_rest_cat', {
        start: 0,
        end: 8,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'rest_dog',
      frames: this.anims.generateFrameNumbers('player_rest_dog', {
        start: 0,
        end: 8,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'skeleton_walking',
      frames: this.anims.generateFrameNumbers('skeleton_walk', {
        start: 0,
        end: 12,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'skeleton_attacking',
      frames: this.anims.generateFrameNumbers('skeleton_attack', {
        start: 0,
        end: 17,
      }),
      frameRate: 15,
    });

    this.anims.create({
      key: 'skeleton_death',
      frames: this.anims.generateFrameNumbers('skeleton_dead', {
        start: 0,
        end: 14,
      }),
      frameRate: 10,
    });

    this.scene.start('title-screen');
  }
}
