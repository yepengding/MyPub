# MyPub

A Decentralized Privacy-Preserving Publishing Platform

## Main Components

* [contracts/](./contracts)
* [ui/](./ui)

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

### Contract

- [Truffle Suite](https://www.trufflesuite.com/)
- [OpenZeppelin](https://openzeppelin.com/contracts/)
- [IPFS Server API Simulator](https://github.com/yepengding/IPFSServerAPISimulator)

### Front-End

- [Front-end README](https://github.com/yepengding/MyPub/tree/main/ui#tech-stack)

## Diagrams

### Architecture

![Architecture](./document/Architecture.png)

### Sequence Diagrams

![Chain Linking](./document/ChainLinking.png)
![Publishing](./document/Publishing.png)

