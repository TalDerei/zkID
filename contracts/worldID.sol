// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import { IWorldID } from '@worldcoin/world-id-contracts/src/interfaces/IWorldID.sol';
import { ByteHasher } from '@worldcoin/world-id-contracts/src/libraries/ByteHasher.sol';

contract Contract {
    using ByteHasher for bytes;

    // Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    // The WorldID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    // The WorldID group ID (1)
    uint256 internal immutable groupId = 1;

    // Whether a nullifier hash has been used already. Used to prevent double-signaling
    mapping(uint256 => bool) internal nullifierHashes;

    // _worldId The WorldID instance that will verify the proofs
    constructor(IWorldID _worldId) {
        worldId = _worldId;
    }

    /// @param input User's input, used as the signal. Could be something else! (see README)
    /// @param root The of the Merkle tree, returned by the SDK.
    /// @param nullifierHash The nullifier for this proof, preventing double signaling, returned by the SDK.
    /// @param proof The zero knowledge proof that demostrates the claimer is registered with World ID, returned by the SDK.
    /// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
    function verifyAndExecute(
        address input,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        // first, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        // then, we verify they're registered with WorldID, and the input they've provided is correct
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(input).hashToField(),
            nullifierHash,
            abi.encodePacked(address(this)).hashToField(),
            proof
        );

        // finally, we record they've done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;
    }
}