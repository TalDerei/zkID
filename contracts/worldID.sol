// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import { IWorldID } from '@worldcoin/world-id-contracts/src/interfaces/IWorldID.sol';
import { ByteHasher } from '@worldcoin/world-id-contracts/src/libraries/ByteHasher.sol';

contract worldID {
    using ByteHasher for bytes;

    // Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    // Emitted when an user voted successfully
    event Vote(address receiver);

    // WorldID instance that will be used for managing groups and verifying proofs
    IWorldID internal immutable worldId;

    // WorldID group whose participants can claim this airdrop
    uint256 internal immutable groupId; 

    // Whether a nullifier hash has been used already. Used to prevent double-signaling
    mapping(uint256 => bool) internal nullifierHashes;

    // The address that holds the tokens that are being airdropped
    /// Make sure the holder has approved voting for this contract!
    address public immutable holder;

    /// @notice Deploys a WorldIDAirdrop instance
    /// @param _worldId The WorldID instance that will manage groups and verify proofs
    /// @param _groupId The ID of the Semaphore group World ID is using (`1`)
    /// @param _votes The number of votes a user has corresponding to the number of tokens they recieved 
    /// @param _holder The address holding the tokens that will be airdropped
    constructor(
        IWorldID _worldId,
        uint256 _groupId,
        uint256 _votes,
        address _holder
    ) {
        worldId = _worldId;
        groupId = _groupId;
        _votes = _votes;
        holder = _holder;
    }

    /// @notice Vote on a poll
    /// @param receiver The address that is voting
    /// @param nullifierHash The nullifier for this proof, preventing double signaling
    /// @param proof The zero knowledge proof that demostrates the claimer has been onboarded to World ID
    function vote(
        address receiver,
        uint256 nullifierHash,
        uint256 root,
        uint256[8] calldata proof
    ) public {
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(receiver).hashToField(),
            nullifierHash,
            abi.encodePacked(address(this)).hashToField(),
            proof
        );

        nullifierHashes[nullifierHash] = true;

        // vote function
    }
}