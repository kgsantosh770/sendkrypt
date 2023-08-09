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
    uint256 totalTransactions = 0;
    event EthTransfer(Transaction);
    address owner;
    uint256 transactionFee = 0.0006 ether;
    uint256 prizeAmount = 0.003 ether;
    uint rewardedTransaction = 25;

    constructor() {
        owner = msg.sender;
    }

    function deposit() payable public{}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getTotalTransactions() public view returns (uint){
        return totalTransactions;
    }

    function sendEther(address payable reciever, string memory keyword, string memory message) public payable{
        require(msg.sender.balance > 0 wei, "Insufficient Balance");
        require(msg.value >= 0.0002 ether, "Very low ether transfer");
        transferEth(reciever);
        totalTransactions = totalTransactions + 1;
        Transaction memory currentTransaction = Transaction(msg.sender, reciever, msg.value, keyword, message, block.timestamp);
        emit EthTransfer(currentTransaction);
        sendPrizeAmount();
        if(address(this).balance > prizeAmount){
            retrieveFee();
        }
    }

    function transferEth(address payable reciever) internal {
        uint256 amountMinusFee = deductTransactionFee(msg.value);
        (bool sent, ) = reciever.call{value: amountMinusFee}("");
        require(sent, "Failed to send Ether");
    }

    function deductTransactionFee(uint256 amount) public view returns (uint256) {
        return amount - transactionFee;
    }

    function sendPrizeAmount() payable public{
        if(totalTransactions % rewardedTransaction == 0){
            address payable prizeReciever = payable(msg.sender);
            prizeReciever.transfer(prizeAmount);
        }
    }

    function retrieveFee() payable public {
        require(address(this).balance > prizeAmount, "Low contract balance.");
        uint256 contractBalance = address(this).balance - prizeAmount;
        (bool sent, ) = owner.call{value: contractBalance}("");
        require(sent, "Failed to retrieve fee from contract.");
    }
}