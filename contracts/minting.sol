// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Minting function
contract Minting is ERC20 {
    constructor() 
    
    ERC20("zkID", "zkIDToken") {}

    function mint() public {
        // Transfer and collect erc-20 airdrop
        _mint(msg.sender, 100000 * 10**uint(decimals()));
    }
}


