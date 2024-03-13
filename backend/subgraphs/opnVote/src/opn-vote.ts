import {
  ElectionCreated as ElectionCreatedEvent,
  ElectionRegisterKeySet as ElectionRegisterKeySetEvent,
  ElectionResultsPublished as ElectionResultsPublishedEvent,
  ElectionStatusChanged as ElectionStatusChangedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  VoteCast as VoteCastEvent,
  VoteUpdated as VoteUpdatedEvent,
  VoterAuthorized as VoterAuthorizedEvent,
  VoterRegistered as VoterRegisteredEvent,
  VotersAuthorized as VotersAuthorizedEvent,
  VotersRegistered as VotersRegisteredEvent
} from "../generated/opnVote/opnVote"
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
} from "../generated/schema"

export function handleElectionCreated(event: ElectionCreatedEvent): void {
  let entity = new ElectionCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.electionID = event.params.electionID
  entity.startTime = event.params.startTime
  entity.endTime = event.params.endTime
  entity.registerId = event.params.registerId
  entity.authProviderId = event.params.authProviderId
  entity.svsId = event.params.svsId
  entity.ballotLength = event.params.ballotLength
  entity.descriptionIPFSHash = event.params.descriptionIPFSHash
  entity.ballotIPFSHash = event.params.ballotIPFSHash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleElectionRegisterKeySet(
  event: ElectionRegisterKeySetEvent
): void {
  let entity = new ElectionRegisterKeySet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.electionID = event.params.electionID
  entity.registerKey = event.params.registerKey

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleElectionResultsPublished(
  event: ElectionResultsPublishedEvent
): void {
  let entity = new ElectionResultsPublished(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.electionID = event.params.electionID
  entity.privateKey = event.params.privateKey
  entity.yesVotes = event.params.yesVotes
  entity.noVotes = event.params.noVotes
  entity.invalidVotes = event.params.invalidVotes

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleElectionStatusChanged(
  event: ElectionStatusChangedEvent
): void {
  let entity = new ElectionStatusChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.electionID = event.params.electionID
  entity.oldStatus = event.params.oldStatus
  entity.newStatus = event.params.newStatus
  entity.cancelReasonIPFS = event.params.cancelReasonIPFS

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteCast(event: VoteCastEvent): void {
  let entity = new VoteCast(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.electionID = event.params.electionID
  entity.voter = event.params.voter
  entity.svsSignature = event.params.svsSignature
  entity.vote_encrypted = event.params.vote_encrypted
  entity.unblindedElectionToken = event.params.unblindedElectionToken
  entity.unblindedSignature = event.params.unblindedSignature

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteUpdated(event: VoteUpdatedEvent): void {
  let entity = new VoteUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.electionID = event.params.electionID
  entity.voter = event.params.voter
  entity.vote_encrypted = event.params.vote_encrypted

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoterAuthorized(event: VoterAuthorizedEvent): void {
  let entity = new VoterAuthorized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.electionID = event.params.electionID
  entity.voterID = event.params.voterID
  entity.apID = event.params.apID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoterRegistered(event: VoterRegisteredEvent): void {
  let entity = new VoterRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.electionID = event.params.electionID
  entity.voterID = event.params.voterID
  entity.registerID = event.params.registerID
  entity.blindedSignature = event.params.blindedSignature
  entity.blindedElectionToken = event.params.blindedElectionToken

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVotersAuthorized(event: VotersAuthorizedEvent): void {
  let entity = new VotersAuthorized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.electionID = event.params.electionID
  entity.voterIDs = event.params.voterIDs
  entity.apID = event.params.apID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVotersRegistered(event: VotersRegisteredEvent): void {
  let entity = new VotersRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.electionID = event.params.electionID
  entity.voterIDs = event.params.voterIDs
  entity.registerID = event.params.registerID
  entity.blindedSignature = event.params.blindedSignature
  entity.blindedElectionToken = event.params.blindedElectionToken

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
