const ethereumConfig = {
    publicationAddress: "0x2de852131656BfEe5b91E4Cf86919a23ba60Be75",
    publicationAbi: [
        "event Published(address indexed _from, uint256 _id, uint _price)",
        "function mint(string, uint) public returns (uint256)",
        "function totalSupply() view returns (uint)",
        "function tokenByIndex(uint) view returns (uint)",
        "function tokenURI(uint) view returns (string)"
    ]
}

const ipfsConfig = {
    gateway: "http://localhost:8080/ipfs"
}

export {ethereumConfig, ipfsConfig}
