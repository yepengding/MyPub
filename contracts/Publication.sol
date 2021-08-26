// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Publication is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _id;

    // address owner;

    // modifier onlyowner {
    //     require(owner == msg.sender);
    //     _;
    // }

    event Published(address indexed _from, uint256 _id, string _price);

    constructor() ERC721("Publication", "PUB") public {
        _setBaseURI("http://localhost:8080/ipfs/");
    }

    function mint(string memory _cid, string memory _price) public returns (uint256) {
        _id.increment();

        uint256 newId = _id.current();
        _mint(msg.sender, newId);
        _setTokenURI(newId, _cid);

        emit Published(msg.sender, newId, _price);

        return newId;
    }

}
