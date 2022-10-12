import Phaser from 'phaser';
import CoCoList from '../javascript/cocoList';

export default class CoCoSelect extends Phaser.Scene {
  constructor() {
    super('coco-select');
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
    const leaderboard = new CoCoList();

    if (this.game.config.myAddress) {
      this.cocos = leaderboard.getCoCos(this.game.config.myAddress);
    }
  }

  create() {
    this.title = this.make.text({
      x: this.width / 2,
      y: 50,
      text: 'Choose your COCO',
      style: {
        fontSize: '60px',
        fill: '#fff200',
        fontFamily: 'Arcadia, monospace',
      },
    }).setOrigin(0.5, 0.5);

    this.buyCoco();

    this.time.delayedCall(1000, () => {
      this.cocos.then(result => {
        let prevRank;
        let prevImage;
        let prevName;

        for (let i = 0; i < result.length; i += 1) {
          const { name, image, address } = result[i];
          this.load.image(name, image);
          this.load.once('complete', () => {
            const rank = this.rankText(i + 1);
            const cocoName = this.nameText(name);
            const scoreN = this.cocoImage(name, address);

            if (i >= 1) {
              rank.y = prevRank.y + 120;
              cocoName.y = prevName.y + 120;
              scoreN.y = prevImage.y + 120;
            }

            prevRank = rank;
            prevName = cocoName;
            prevImage = scoreN;
          });
          this.load.start();
        }
      });
    });
  }

  rankText(rank) {
    return this.make.text({
      x: this.width / 5.7,
      y: this.title.y + 120,
      text: rank,
      style: {
        fontSize: '30px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    }).setOrigin(0.5, 0.5);
  }

  nameText(player) {
    return this.make.text({
      x: this.width / 2 - 20,
      y: this.title.y + 120,
      text: player,
      style: {
        fontSize: '30px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    }).setOrigin(0.5, 0.5);
  }

  openExternalLink ()
  {
      window.open('https://testnets.opensea.io/', '_blank');
  }

  buyCoco() {
    var buyLink = this.make.text({
      x: this.width / 2 - 20,
      y: this.title.y + 50,
      text: 'Buy Coco NFTs',
      style: {
        fontSize: '30px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace'
      },
    }).setOrigin(0.5, 0.5).setInteractive({ cursor: 'pointer' });
    buyLink.on('pointerup', this.openExternalLink, this);
    return buyLink;
  }

  cocoImage(name, address) {
    const ctn = this.add.image(this.width - 235, this.title.y + 120, name).setInteractive({ useHandCursor: true }).setOrigin(0.5, 0.5)
    .on('pointerdown', () => {
      this.game.config.cocoName = name.split(' - ')[1];
      this.game.config.cocoAddress = address;
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.scene.start('cocoLoader');
    });

    ctn.width = 40;
    ctn.height = 40;

    return ctn;
  }
}