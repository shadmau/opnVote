// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

struct AuthorizationProvider {
    string name;
    string url;
    bytes publicKey;
    address owner; //todo: update to just election Coordinator?
}

struct Register {
    string name;
    string url;
    bytes publicKey;
    address owner; //todo: update to just election Coordinator?
}

struct SVS {
    string name;
    string url;
    bytes publicKey;
    address owner; //todo: update to just election Coordinator?
}