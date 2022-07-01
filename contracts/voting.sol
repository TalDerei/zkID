pragma solidity ^0.8.11;

contract Voting {
  mapping (uint8 => uint256) public votesReceived;

  mapping (uint256 => uint256) public votesCast;
  mapping (uint256 => uint256) public votesRecognised;
  mapping (address => uint256) public addresstoNullifier;
  
  bytes32[] public candidateList;

  //  two candidates for sake of testing and demo, but we do support three or more
  uint8 public candidateA;
  uint8 public candidateB;

  constructor() public {
    candidateA = 0;
    candidateB = 1;
  }

  function totalVotesFor(uint8 candidate) public view returns (uint256) {
    // require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  function voteForCandidate(uint8 candidate, address wallet, uint256 voter, uint256 votes) public {
    require(votes > 0);
    require(validCandidate(candidate));
    addresstoNullifier[wallet] = voter;
    votesCast[voter] = votes;
    uint256 votesRegistered = _quadVote(votesCast[voter]);
    votesReceived[candidate] -= votesRecognised[voter]; 
    votesReceived[candidate] += votesRegistered; 
    votesRecognised[voter] = votesRegistered;
  }

  function voterVotesCast(address voter) public view returns (uint256) {
    return votesCast[addresstoNullifier[voter]];
  }
  
  function voterVotesRecognised(address voter) public view returns (uint256) {
      return votesRecognised[addresstoNullifier[voter]];
  }

  // we cap votes to 10 to prevent overwhelmingly large wallets from hijacking the votes
  function _quadVote(uint256 votes) private returns (uint256) {
    uint256 currVote = 0;
    while(votes > (currVote+1)^2){
      currVote ++;
      votes -= currVote^2;
    }
    return currVote;
    // if (votes < 1) {
    //   return 0;
    // }
    // if (votes < 4) {
    //   return 1;
    // }
    // if (votes < 9) {
    //   return 2;
    // }
    // if (votes < 16) {
    //   return 3;
    // }
    // if (votes < 25) {
    //   return 4;
    // }
    // if (votes < 36) {
    //   return 5;
    // }
    // if (votes < 49) {
    //   return 6;
    // }
    // if (votes < 64) {
    //   return 7;
    // }
    // if (votes < 81) {
    //   return 8;
    // }
    // if (votes < 100) {
    //   return 9;
    // }
    // return 10;
  }

  function validCandidate(uint8 candidate) public returns (bool) {
    return (candidate == 0 || candidate == 1);
  }
}