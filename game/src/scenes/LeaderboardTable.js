import Phaser from 'phaser';
import Leaderboard from '../javascript/leaderboard';

export default class LeaderboardTable extends Phaser.Scene {
  constructor() {
    super('leaderboard-table');
  }

  init(data) {
    this.score = data.score;
    this.song = data.song;
    this.player = this.game.config.myAddress;
  }
  
  preload() {
    this.width = this.scale.width;
    this.height = this.scale.height;
    const leaderboard = new Leaderboard();

    this.leaderboard = leaderboard.getScores(this.game.config.signer);
  }

  create() {
    const title = this.make.text({
      x: this.width / 2,
      y: 50,
      text: 'LEADERBOARD',
      style: {
        fontSize: '50px',
        fill: '#fff200',
        fontFamily: 'Arcadia, monospace',
      },
    }).setOrigin(0.5, 0.5);

    this.sub = this.make.text({
      x: this.width / 2,
      y: title.y + 88,
      text: 'Rank       Player       Score',
      style: {
        fontSize: '30px',
        fill: '#003fff',
        fontFamily: 'Arcadia, monospace',
      },
    }).setOrigin(0.5, 0.5);

    this.time.delayedCall(1000, () => {
      this.leaderboard.then(result => {
        let prevRank;
        let prevName;
        let prevScore;

        for (let i = 0; i < result.length; i += 1) {
          const { user, score } = result[i];

          const rank = this.rankText(i + 1);
          const name = this.nameText(user);
          const scoreN = this.scoreText(score);

          if (i >= 1) {
            rank.y = prevRank.y + 70;
            name.y = prevName.y + 70;
            scoreN.y = prevScore.y + 70;
          }

          prevRank = rank;
          prevName = name;
          prevScore = scoreN;
        }

        this.make.text({
          x: this.width / 2,
          y: prevRank.y + 120,
          text: `Your Score\n${this.score}`,
          style: {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'Arcadia, monospace',
            align: 'center',
          },
        }).setOrigin(0.5, 0.5);
    
        this.make.text({
          x: this.width / 2,
          y: prevRank.y + 220,
          text: 'Challenge with others(0.01ETH fee)',
          style: {
            fontSize: '30px',
            fill: '#ffffff',
          },
        }).setOrigin(0.5, 0.5);

        this.make.text({
          x: this.width / 2,
          y: prevRank.y + 260,
          text: 'Top 3 players will earn RCR tokens every week!',
          style: {
            fontSize: '30px',
            fill: '#ffffff',
          },
        }).setOrigin(0.5, 0.5);

        this.playBtn = this.add.text(this.width / 2 - 80, prevRank.y + 340, 'Retry').setOrigin(0.5)
        .setPadding(15)
        .setStyle({ backgroundColor: '#fff200', fontSize: '24px', fill: '#111'})
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          this.song.stop();
          this.cameras.main.fadeOut(2000, 255, 255, 255);
          this.scene.start('title-screen');
        })
        .on('pointerover', () => this.playBtn.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => this.playBtn.setStyle({ fill: '#111' }));

        this.challengeBtn = this.add.text(this.width / 2 + 80, prevRank.y + 340, 'Challenge').setOrigin(0.5)
        .setPadding(15)
        .setStyle({ backgroundColor: '#fff200', fontSize: '24px', fill: '#111' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          const lb = new Leaderboard();
          lb.postScore(this.game.config.signer, this.score);
        })
        .on('pointerover', () => this.challengeBtn.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => this.challengeBtn.setStyle({ fill: '#111' }));



      });
    });
  }

  rankText(rank) {
    return this.make.text({
      x: this.width / 5.7,
      y: this.sub.y + 75,
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
      y: this.sub.y + 75,
      text: player,
      style: {
        fontSize: '30px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    }).setOrigin(0.5, 0.5);
  }

  scoreText(score) {
    return this.make.text({
      x: this.width - 235,
      y: this.sub.y + 75,
      text: score,
      style: {
        fontSize: '30px',
        fill: '#ffffff',
        fontFamily: 'Arcadia, monospace',
      },
    }).setOrigin(0.5, 0.5);
  }
}