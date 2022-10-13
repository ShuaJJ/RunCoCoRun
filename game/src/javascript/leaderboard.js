require('regenerator-runtime/runtime');
import GameScores from "../contracts/GameScores.json";
import addresses from "../contracts/contract-address.json";
import shorten from "./shorten";

export default class Leaderboard {
  async getScores(web3) {

    const ScoresContract = new web3.eth.Contract(GameScores["abi"], addresses["Score"]);

    return new Promise((resolve, reject) => {
      this.scoreArray = [];

      ScoresContract.methods.topScores().call().then((data) => {
        let addresses = data[0];
        let scores = data[1];
        var res = [];
        for (var i=0; i<addresses.length; i++) {
          res.push({
            user: shorten(addresses[i]),
            score: scores[i]
          })
        }
        resolve(res);
      });

    });
  }

  async postScore(player, score) {
    return new Promise((resolve, reject) => {
      const entry = { user: player, score: String(score) };
    });
  }
}