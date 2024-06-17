// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {coin} from "./coin.sol";

contract coinFactory {

    coin[] public list;

    event createdCoin(address adresse, string name, string symbol);

    constructor() {}

    function generateCoin (string memory name, string memory symbol) public {
        coin newCoin = new coin(name, symbol);
        list.push(newCoin);
        emit createdCoin(address(newCoin), name, symbol);
    }

    function getCoin() public view returns (coin[] memory){
        coin[] memory tmpList = new coin[](list.length);
        for (uint i = 0; i < list.length; i ++) {
            tmpList[i] = list[i];
        }

        return tmpList;
    }

}