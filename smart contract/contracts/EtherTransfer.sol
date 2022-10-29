// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract EtherTransfer {
    function sendEther(address payable reciever) public payable {
        require(msg.sender.balance > 0 wei, "Insufficient Balance");
        (bool sent, ) = reciever.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
}