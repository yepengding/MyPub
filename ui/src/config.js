const ethereumConfig = {
    publicationAddress: "0x2de852131656BfEe5b91E4Cf86919a23ba60Be75",
    publicationAbi: [
        "event Published(address indexed _from, uint256 _id, uint256 _price)",
        "event Paid(address indexed _from, uint256 _id)",
        "function mint(string, uint256) public returns (uint256)",
        "function purchase(uint256) public payable",
        "function withdrawAmount(uint256) public",
        "function getBalance() public view returns (uint256)",
        "function ownerOf(uint256) view returns (address)",
        "function totalSupply() view returns (uint)",
        "function tokenByIndex(uint) view returns (uint)",
        "function tokenURI(uint) view returns (string)"
    ]
}

const ipfsConfig = {
    gateway: "http://localhost:5001/ipfs"
}

export {ethereumConfig, ipfsConfig}
