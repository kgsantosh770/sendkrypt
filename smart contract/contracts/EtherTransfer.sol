// SPDX-License-Identifier: MIT LICENSE
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract EtherTransfer {
    struct Transaction {
        address from;
        address to;
        uint256 amount;
        string keyword;
        string message;
        uint256 timestamp;
    }

    event EthTransfer(Transaction);

    function sendEther(address payable reciever, string memory keyword, string memory message) public payable{
        require(msg.sender.balance > 0 wei, "Insufficient Balance");
        transfer(reciever);
        Transaction memory currentTransaction = Transaction(msg.sender, reciever, msg.value, keyword, message, block.timestamp);
        emit EthTransfer(currentTransaction);
    }

    function transfer(address payable reciever) internal {
        (bool sent, ) = reciever.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
}