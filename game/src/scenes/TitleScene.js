import Phaser from 'phaser';
import createAligned from '../javascript/createAligned';
import Web3 from "web3";
import Web3Modal from "web3modal";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('title-screen');
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;

    this.web3Modal = new Web3Modal({
      network: "goerli",
      cacheProvider: true,
      providerOptions: {},
    });

    if (this.web3Modal.cachedProvider) {
      this.web3login();
    }
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.scene.pauseOnBlur = false;

    this.menuSong = this.sound.add('menu', { volume: 0.25, loop: true });
    this.menuSong.play();

    const bgh = this.textures.get('background').getSourceImage().height;

    this.add.tileSprite(0, this.height, this.width, bgh, 'background')
      .setOrigin(0, 1).setScrollFactor(0);

    this.bg1 = createAligned(this, -23, 'bgTree_1', true);
    this.bg2 = createAligned(this, 100, 'lights_1', false);
    this.bg3 = createAligned(this, -53, 'bgTree_2', true);
    this.bg4 = createAligned(this, 20, 'bgTree_3', true);
    this.bg5 = createAligned(this, 100, 'lights_2', false);
    this.bg8 = createAligned(this, 10, 'floor', true, -250);

    this.playerCat = this.add.sprite(200, this.height - 95, 'player_rest_cat');
    this.playerCat.anims.play('rest_cat');

    this.playerDog = this.add.sprite(236, this.height - 95, 'player_rest_dog');
    this.playerDog.anims.play('rest_dog');

    const title = this.make.text({
      x: this.width / 2,
      y: this.height / 2 - 140,
      text: 'RUN! COCO! RUN!',
      style: {
        fontSize: '90px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    });
    title.setOrigin(0.5, 0.5);

    this.playBtn = this.add.image(this.width / 2, this.height / 2 + 60, 'play').setInteractive({ useHandCursor: true }).setOrigin(0.5, 0.5)
      .on('pointerdown', () => this.playIsPressed())
      .on('pointerup', () => {
        this.playNotPressed();
        this.start();
      });

    ['A', 'S', 'SPACE', 'ENTER'].forEach(key => {
      const keyP = this.input.keyboard.addKey(key);
      keyP.on('down', () => {
        this.start();
      });
    });
  }

  start() {
    if (this.game.config.myAddress) {
      this.menuSong.stop();
      this.cameras.main.fadeOut(2000, 255, 255, 255);
      this.scene.start('coco-select');
    } else {
      const errorText = this.make.text({
        x: this.width / 2,
        y: this.height / 2 - 60,
        text: 'You have not connected your wallet',
        style: {
          fontSize: '20px',
          fill: 'red',
          fontFamily: 'Arcadia, monospace',
        },
      });
      errorText.setOrigin(0.5, 0.5);
      this.web3login();
    }
  }

  update() {
    const bgs = [this.bg1, this.bg2, this.bg3, this.bg4, this.bg5, this.bg8];
    const fact = [0.1, 0.15, 0.25, 0.4, 0.5, 1.5];

    bgs.forEach((bg, index) => {
      bg.tilePositionX += fact[index];
    });
  }

  playIsPressed() {
    this.playBtn.setTexture('playPressed');
  }

  playNotPressed() {
    this.playBtn.setTexture('play');
  }

  web3login() {
    this.web3Modal.connect().then((provider) => {
      const web3 = new Web3(provider);
      this.game.config.web3 = web3;
      this.subscribeProvider(provider);
      web3.eth.getAccounts().then((accounts) => {
        const addr = accounts[0];
        this.game.config.myAddress = addr;
      });
    });
  }

  subscribeProvider(provider) {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => resetApp());
    provider.on("disconnect", (error) => {
      resetApp();
    });
    provider.on("accountsChanged", async (accounts) => {
      const addr = accounts[0];
      this.menuSong.stop();
      this.cameras.main.fadeOut(1200, 0, 0, 0);
      this.scene.start('leaderboard-table', { song: ending });
    });
  };
}