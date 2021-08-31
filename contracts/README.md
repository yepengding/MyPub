# MyPub Contract

Smart contracts of MyPub.

## Configuration

> truffle-config.js

[Set truffle environment](https://www.trufflesuite.com/docs/truffle/reference/configuration)

> Publication.sol

[Set base URL](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721Metadata-_setBaseURI-string-)

## Commands

### Compile

```shell
truffle compile
```

### Compile ABI

Install [solc](https://soliditylang.org/)

```shell
solc --abi *.sol -o build
```

### Migrate

```shell
truffle migrate
```

## Tech Stack

- [Truffle Suite](https://www.trufflesuite.com/)
- [OpenZeppelin](https://openzeppelin.com/contracts/)
- [IPFS Server API Simulator](https://github.com/yepengding/IPFSServerAPISimulator)
