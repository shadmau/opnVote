import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Bytes, Address } from "@graphprotocol/graph-ts"
import { ElectionCreated } from "../generated/schema"
import { ElectionCreated as ElectionCreatedEvent } from "../generated/opnVote/opnVote"
import { handleElectionCreated } from "../src/opn-vote"
import { createElectionCreatedEvent } from "./opn-vote-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let electionID = BigInt.fromI32(234)
    let startTime = BigInt.fromI32(234)
    let endTime = BigInt.fromI32(234)
    let registerId = 123
    let authProviderId = 123
    let svsId = 123
    let ballotLength = 123
    let descriptionIPFSHash = "Example string value"
    let ballotIPFSHash = "Example string value"
    let newElectionCreatedEvent = createElectionCreatedEvent(
      electionID,
      startTime,
      endTime,
      registerId,
      authProviderId,
      svsId,
      ballotLength,
      descriptionIPFSHash,
      ballotIPFSHash
    )
    handleElectionCreated(newElectionCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ElectionCreated created and stored", () => {
    assert.entityCount("ElectionCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ElectionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "electionID",
      "234"
    )
    assert.fieldEquals(
      "ElectionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "startTime",
      "234"
    )
    assert.fieldEquals(
      "ElectionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "endTime",
      "234"
    )
    assert.fieldEquals(
      "ElectionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "registerId",
      "123"
    )
    assert.fieldEquals(
      "ElectionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "authProviderId",
      "123"
    )
    assert.fieldEquals(
      "ElectionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "svsId",
      "123"
    )
    assert.fieldEquals(
      "ElectionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ballotLength",
      "123"
    )
    assert.fieldEquals(
      "ElectionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "descriptionIPFSHash",
      "Example string value"
    )
    assert.fieldEquals(
      "ElectionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ballotIPFSHash",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
