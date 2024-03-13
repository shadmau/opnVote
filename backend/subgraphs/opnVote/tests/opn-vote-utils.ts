import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Bytes, Address } from "@graphprotocol/graph-ts"
import {
  ElectionCreated,
  ElectionRegisterKeySet,
  ElectionResultsPublished,
  ElectionStatusChanged,
  OwnershipTransferred,
  VoteCast,
  VoteUpdated,
  VoterAuthorized,
  VoterRegistered,
  VotersAuthorized,
  VotersRegistered
} from "../generated/opnVote/opnVote"

export function createElectionCreatedEvent(
  electionID: BigInt,
  startTime: BigInt,
  endTime: BigInt,
  registerId: i32,
  authProviderId: i32,
  svsId: i32,
  ballotLength: i32,
  descriptionIPFSHash: string,
  ballotIPFSHash: string
): ElectionCreated {
  let electionCreatedEvent = changetype<ElectionCreated>(newMockEvent())

  electionCreatedEvent.parameters = new Array()

  electionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "electionID",
      ethereum.Value.fromUnsignedBigInt(electionID)
    )
  )
  electionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  electionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )
  electionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "registerId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(registerId))
    )
  )
  electionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "authProviderId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(authProviderId))
    )
  )
  electionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "svsId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(svsId))
    )
  )
  electionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "ballotLength",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(ballotLength))
    )
  )
  electionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "descriptionIPFSHash",
      ethereum.Value.fromString(descriptionIPFSHash)
    )
  )
  electionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "ballotIPFSHash",
      ethereum.Value.fromString(ballotIPFSHash)
    )
  )

  return electionCreatedEvent
}

export function createElectionRegisterKeySetEvent(
  electionID: BigInt,
  registerKey: Bytes
): ElectionRegisterKeySet {
  let electionRegisterKeySetEvent = changetype<ElectionRegisterKeySet>(
    newMockEvent()
  )

  electionRegisterKeySetEvent.parameters = new Array()

  electionRegisterKeySetEvent.parameters.push(
    new ethereum.EventParam(
      "electionID",
      ethereum.Value.fromUnsignedBigInt(electionID)
    )
  )
  electionRegisterKeySetEvent.parameters.push(
    new ethereum.EventParam(
      "registerKey",
      ethereum.Value.fromBytes(registerKey)
    )
  )

  return electionRegisterKeySetEvent
}

export function createElectionResultsPublishedEvent(
  electionID: BigInt,
  privateKey: Bytes,
  yesVotes: Array<BigInt>,
  noVotes: Array<BigInt>,
  invalidVotes: Array<BigInt>
): ElectionResultsPublished {
  let electionResultsPublishedEvent = changetype<ElectionResultsPublished>(
    newMockEvent()
  )

  electionResultsPublishedEvent.parameters = new Array()

  electionResultsPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "electionID",
      ethereum.Value.fromUnsignedBigInt(electionID)
    )
  )
  electionResultsPublishedEvent.parameters.push(
    new ethereum.EventParam("privateKey", ethereum.Value.fromBytes(privateKey))
  )
  electionResultsPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "yesVotes",
      ethereum.Value.fromUnsignedBigIntArray(yesVotes)
    )
  )
  electionResultsPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "noVotes",
      ethereum.Value.fromUnsignedBigIntArray(noVotes)
    )
  )
  electionResultsPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "invalidVotes",
      ethereum.Value.fromUnsignedBigIntArray(invalidVotes)
    )
  )

  return electionResultsPublishedEvent
}

export function createElectionStatusChangedEvent(
  electionID: BigInt,
  oldStatus: i32,
  newStatus: i32,
  cancelReasonIPFS: string
): ElectionStatusChanged {
  let electionStatusChangedEvent = changetype<ElectionStatusChanged>(
    newMockEvent()
  )

  electionStatusChangedEvent.parameters = new Array()

  electionStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "electionID",
      ethereum.Value.fromUnsignedBigInt(electionID)
    )
  )
  electionStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "oldStatus",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(oldStatus))
    )
  )
  electionStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newStatus",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(newStatus))
    )
  )
  electionStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "cancelReasonIPFS",
      ethereum.Value.fromString(cancelReasonIPFS)
    )
  )

  return electionStatusChangedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createVoteCastEvent(
  electionID: BigInt,
  voter: Address,
  svsSignature: Bytes,
  vote_encrypted: Bytes,
  unblindedElectionToken: Bytes,
  unblindedSignature: Bytes
): VoteCast {
  let voteCastEvent = changetype<VoteCast>(newMockEvent())

  voteCastEvent.parameters = new Array()

  voteCastEvent.parameters.push(
    new ethereum.EventParam(
      "electionID",
      ethereum.Value.fromUnsignedBigInt(electionID)
    )
  )
  voteCastEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  voteCastEvent.parameters.push(
    new ethereum.EventParam(
      "svsSignature",
      ethereum.Value.fromBytes(svsSignature)
    )
  )
  voteCastEvent.parameters.push(
    new ethereum.EventParam(
      "vote_encrypted",
      ethereum.Value.fromBytes(vote_encrypted)
    )
  )
  voteCastEvent.parameters.push(
    new ethereum.EventParam(
      "unblindedElectionToken",
      ethereum.Value.fromBytes(unblindedElectionToken)
    )
  )
  voteCastEvent.parameters.push(
    new ethereum.EventParam(
      "unblindedSignature",
      ethereum.Value.fromBytes(unblindedSignature)
    )
  )

  return voteCastEvent
}

export function createVoteUpdatedEvent(
  electionID: BigInt,
  voter: Address,
  vote_encrypted: Bytes
): VoteUpdated {
  let voteUpdatedEvent = changetype<VoteUpdated>(newMockEvent())

  voteUpdatedEvent.parameters = new Array()

  voteUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "electionID",
      ethereum.Value.fromUnsignedBigInt(electionID)
    )
  )
  voteUpdatedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  voteUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "vote_encrypted",
      ethereum.Value.fromBytes(vote_encrypted)
    )
  )

  return voteUpdatedEvent
}

export function createVoterAuthorizedEvent(
  electionID: BigInt,
  voterID: BigInt,
  apID: i32
): VoterAuthorized {
  let voterAuthorizedEvent = changetype<VoterAuthorized>(newMockEvent())

  voterAuthorizedEvent.parameters = new Array()

  voterAuthorizedEvent.parameters.push(
    new ethereum.EventParam(
      "electionID",
      ethereum.Value.fromUnsignedBigInt(electionID)
    )
  )
  voterAuthorizedEvent.parameters.push(
    new ethereum.EventParam(
      "voterID",
      ethereum.Value.fromUnsignedBigInt(voterID)
    )
  )
  voterAuthorizedEvent.parameters.push(
    new ethereum.EventParam(
      "apID",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(apID))
    )
  )

  return voterAuthorizedEvent
}

export function createVoterRegisteredEvent(
  electionID: BigInt,
  voterID: BigInt,
  registerID: i32,
  blindedSignature: Bytes,
  blindedElectionToken: Bytes
): VoterRegistered {
  let voterRegisteredEvent = changetype<VoterRegistered>(newMockEvent())

  voterRegisteredEvent.parameters = new Array()

  voterRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "electionID",
      ethereum.Value.fromUnsignedBigInt(electionID)
    )
  )
  voterRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "voterID",
      ethereum.Value.fromUnsignedBigInt(voterID)
    )
  )
  voterRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "registerID",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(registerID))
    )
  )
  voterRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "blindedSignature",
      ethereum.Value.fromBytes(blindedSignature)
    )
  )
  voterRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "blindedElectionToken",
      ethereum.Value.fromBytes(blindedElectionToken)
    )
  )

  return voterRegisteredEvent
}

export function createVotersAuthorizedEvent(
  electionID: BigInt,
  voterIDs: Array<BigInt>,
  apID: i32
): VotersAuthorized {
  let votersAuthorizedEvent = changetype<VotersAuthorized>(newMockEvent())

  votersAuthorizedEvent.parameters = new Array()

  votersAuthorizedEvent.parameters.push(
    new ethereum.EventParam(
      "electionID",
      ethereum.Value.fromUnsignedBigInt(electionID)
    )
  )
  votersAuthorizedEvent.parameters.push(
    new ethereum.EventParam(
      "voterIDs",
      ethereum.Value.fromUnsignedBigIntArray(voterIDs)
    )
  )
  votersAuthorizedEvent.parameters.push(
    new ethereum.EventParam(
      "apID",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(apID))
    )
  )

  return votersAuthorizedEvent
}

export function createVotersRegisteredEvent(
  electionID: BigInt,
  voterIDs: Array<BigInt>,
  registerID: i32,
  blindedSignature: Bytes,
  blindedElectionToken: Bytes
): VotersRegistered {
  let votersRegisteredEvent = changetype<VotersRegistered>(newMockEvent())

  votersRegisteredEvent.parameters = new Array()

  votersRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "electionID",
      ethereum.Value.fromUnsignedBigInt(electionID)
    )
  )
  votersRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "voterIDs",
      ethereum.Value.fromUnsignedBigIntArray(voterIDs)
    )
  )
  votersRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "registerID",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(registerID))
    )
  )
  votersRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "blindedSignature",
      ethereum.Value.fromBytes(blindedSignature)
    )
  )
  votersRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "blindedElectionToken",
      ethereum.Value.fromBytes(blindedElectionToken)
    )
  )

  return votersRegisteredEvent
}
