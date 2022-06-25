// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

// ERC-20 transfer function (recipient, amount)
interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
}

// Lottery contract with merkle-tree inclusion proofs
contract Minting is Ownable, Initializable{
    // State variables
    IERC20 public airdrop_erc;

    // Generate random number using block difficulty and timestamp
    function random() private view returns (uint256) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp))) % 100;
    }

    function collectERC20() public {
        // Transfer and collect erc-20 airdrop
        airdrop_erc.transfer(msg.sender, 100);
    }
}
