// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
Funktionalität:
1. AP, SVS, Register erstellen -> Wo/Wie werden diese gespeichert?
2. AP, SVS, Register updatedn -> Wer kann AP, SVS, Register aktualisieren?



 */


contract OpenVote {
    uint256 public number;

    event Vote(address indexed _voter, bytes32 indexed _electionID, bytes _unblindedSignature, bytes _unblindedElectionToken);

    function vote(address voter, bytes memory svsSignature, bytes memory vote, uint8 electionID, bytes memory unblindedElectionToken, bytes memory unblindedSignature) public {

        // emit()
    }


    function createElection() public {}
    function cancelElection() public {}
    function publishElectionResults() public {}
    

}
