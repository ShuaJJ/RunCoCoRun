require('regenerator-runtime/runtime');
import GameScores from "../contracts/GameScores.json";
import addresses from "../contracts/contract-address.json";
import shorten from "./shorten";
var ethers = require('ethers')

export default class Leaderboard {
  async getScores(signer) {

    const ScoresContract = new ethers.Contract(addresses["Score"], GameScores["abi"], signer);

    return new Promise((resolve, reject) => {
      this.scoreArray = [];

      ScoresContract.topScores().then((data) => {
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

  async postScore(signer, score) {
    const ScoresContract = new ethers.Contract(addresses["Score"], GameScores["abi"], signer);
    return new Promise((resolve, reject) => {
      const options = {value: ethers.utils.parseEther("0.01")}
      ScoresContract.updateScore(score, options).then((receipt) => {
        alert('Succeed');
        resolve(receipt);
      }).catch((e) => {
        console.log("Error:", e);
        alert("Failed! Please check your balance!");
      });
    });
  }
}