pragma solidity ^0.6.4;

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  
  mapping (bytes32 => uint256) public votesReceived;
  mapping (bytes32 => bool) public candidateRegistered;

  mapping (uint256 => uint256) public votesCast;
  mapping (uint256 => uint256) public votesRecognised;


//  mapping (uint256 => uint256) public votesReceived;
  
  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */
  
  bytes32[] public candidateList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  constructor(bytes32[] memory candidateNames) public {
    candidateList = candidateNames;
    for (i=0; i<candidateNames.length; i++) {
      candidateRegistered[candidateNames[i]] = true;
    }
  }

  // This function returns the total votes a candidate has received so far
  function totalVotesFor(bytes32 candidate) view public returns (uint256) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForCandidate(bytes32 candidate, uint256 voter, uint256 votes) public {
    require(votes > 0);
    require(validCandidate(candidate));
    votesCast[voter] += votes;
    uint256 memory votesRegistered = _quadVote(votesCast[voter]);
    votesReceived[candidate] -= votesRecognised[voter];
    votesReceived[candidate] += votesRegistered;
    votesRecognised[voter] = votesRecognised;
  }

  function voterVotesCast(uint256 voter) public returns (uint256) {
    return votesCast[voter];
  }
  
  function voterVotesRecognised(uint256 voter) public returns (uint256) {
    return votesRecognised[voter];
  }

  // we cap votes to 10 to prevent overwhelmingly large wallets from hijacking the votes
  function _quadVote(uint256 votes) private returns (uint256) {
    if (votes < 1) {
      return 0;
    }
    if (votes < 4) {
      return 1;
    }
    if (votes < 9) {
      return 2;
    }
    if (votes < 16) {
      return 3;
    }
    if (votes < 25) {
      return 4;
    }
    if (votes < 36) {
      return 5;
    }
    if (votes < 49) {
      return 6;
    }
    if (votes < 64) {
      return 7;
    }
    if (votes < 81) {
      return 8;
    }
    if (votes < 100) {
      return 9;
    }
    return 10;
  }

  function validCandidate(bytes32 candidate) public returns (bool) {
    return candidateRegistered[candidate];
  }
}