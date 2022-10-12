import Phaser from 'phaser';

export default class Instructions extends Phaser.Scene {
  constructor() {
    super('instructions');
  }

  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  create() {
    this.cameras.main.fadeIn(1000, 255, 255, 255);

    const title = this.make.text({
      x: this.width / 2,
      y: 315,
      text: 'Controls',
      style: {
        fontSize: '60px',
        fill: '#ffffff',
        fontFamily: 'Monogram, monospace',
      },
    });
    title.setOrigin(0.5, 0.5);

    const nextLine2 = this.make.text({
      x: this.width / 2 - 45,
      y: 370,
      text: "To jump over the obstacles use keys 'W' or 'SPACE'",
      style: {
        fontSize: '45px',
        fill: '#ffffff',
        fontFamily: 'Monogram, monospace',
        align: 'justify',
        wordWrap: { width: this.width - 205, useAdvancedWrap: true },
      },
    });
    nextLine2.setOrigin(0.5, 0.5);

    const nextLine3 = this.make.text({
      x: this.width / 2 - 45,
      y: 445,
      text: "To kill the monsters use the key 'A' or the 'LEFT CLICK' from the mouse button",
      style: {
        fontSize: '45px',
        fill: '#ffffff',
        fontFamily: 'Monogram, monospace',
        align: 'justify',
        wordWrap: { width: this.width - 300 },
      },
    });
    nextLine3.setOrigin(0.5, 0.5);

    const nextLine4 = this.make.text({
      x: this.width / 2 - 10,
      y: 545,
      text: "To drop a little faster you can use the Insta Drop key 'S' or the 'RIGHT CLICK' from the mouse button",
      style: {
        fontSize: '45px',
        fill: '#ffffff',
        fontFamily: 'Monogram, monospace',
        align: 'justify',
        wordWrap: { width: this.width - 255, useAdvancedWrap: true },
      },
    });
    nextLine4.setOrigin(0.5, 0.5);

    const cont = this.make.text({
      x: this.width / 2 - 10,
      y: 640,
      text: "[ Press 'ENTER' to continue... ]",
      style: {
        fontSize: '45px',
        fill: '#505050',
        fontFamily: 'Monogram, monospace',
        align: 'justify',
        wordWrap: { width: this.width - 255, useAdvancedWrap: true },
      },
    });
    cont.setOrigin(0.5, 0.5);

    ['A', 'S', 'SPACE', 'ENTER'].forEach(key => {
      const keyP = this.input.keyboard.addKey(key);
      keyP.on('down', () => {
        this.cameras.main.fadeOut(2000, 255, 255, 255);
        this.scene.start('game-start');
      });
    });
  }
}