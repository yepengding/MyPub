const ethereumConfig = {
    publicationAddress: "0xAA675f09577996B839e8EbdBFb9b10588CCbEF7A",
    publicationAbi: [
        "event Published(address indexed _from, uint256 _id, uint256 _price)",
        "event Paid(address indexed _from, uint256 _id)",
        "function mint(string, uint256) public returns (uint256)",
        "function purchase(uint256) public payable",
        "function withdrawAmount(uint256) public",
        "function ownerOf(uint256) view returns (address)",
        "function totalSupply() view returns (uint)",
        "function tokenByIndex(uint) view returns (uint)",
        "function tokenURI(uint) view returns (string)"
    ]
}

const ipfsConfig = {
    gateway: "http://localhost:8080/ipfs"
}

export {ethereumConfig, ipfsConfig}
