// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const path = require("path");

async function main() {

  const Token = await hre.ethers.getContractFactory("CoCoToken");
  const token = await Token.deploy();

  const Scores = await hre.ethers.getContractFactory("GameScores");
  const scores = await Scores.deploy(token.address, "0xe4a5500b3594c902b338d68cb35c0a826c4d26af");

  saveFrontendFiles(token, scores);

}

function saveFrontendFiles(token, score) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "game", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Token: token.address, Score: score.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("CoCoToken");
  const ScoresArtifact = artifacts.readArtifactSync("GameScores");

  fs.writeFileSync(
    path.join(contractsDir, "CoCoToken.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
  fs.writeFileSync(
    path.join(contractsDir, "GameScores.json"),
    JSON.stringify(ScoresArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
