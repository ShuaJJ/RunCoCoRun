// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GameScores is Ownable, AccessControl {

    // The relayer of Openzeppelin Defender will have the manage role
    bytes32 public constant MANAGE_ROLE = keccak256("MANAGE_ROLE");

    // stores the scores of all the players
    mapping(address => uint) public scores;
    // stores the top 3 players
    address[3] public players;
    // Game token
    IERC20 internal token;

    constructor(IERC20 _token, address _manager) {
        token = _token;
        _setupRole(MANAGE_ROLE, _manager);
    }

    function updateScore(uint newScore) external payable {
        require(msg.value >= 10 ** 16, "Value should be greater or equal to 0.01");
        scores[msg.sender] = newScore;

        address player0 = players[0];
        address player1 = players[1];
        
        if (newScore > scores[players[2]]) {
            if (newScore > scores[player0]) {
                players[1] = player0;
                players[2] = player1;
                players[0] = msg.sender;
            } else if (newScore > scores[player1]) {
                players[2] = player1;
                players[1] = msg.sender;
            } else {
                players[2] = msg.sender;
            }
        }
    }

    // Owner of this contract can retrive the balance of this contract
    function retrive() external onlyOwner { 
        address owner = owner();
        payable(owner).transfer(address(this).balance);
    }

    // The autotask in OpenZeppelin's Defender will call this function
    // once a week to distribute tokens to top 3 players
    function playToEarn() external {

        require(hasRole(MANAGE_ROLE, msg.sender), "Caller is not a manager");

        if (players[0] != address(0)) {
            token.transfer(players[0], 500);
        }
        if (players[1] != address(0)) {
            token.transfer(players[1], 300);
        }
        if (players[2] != address(0)) {
            token.transfer(players[2], 100);
        }
    }
}
