// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Publication.sol";

contract TestPublication {

    Publication publication = Publication(DeployedAddresses.Publication());

    string cid = "Qm8da1a041e404a28a6a607facc6749890";
    uint256 price = 100000000000000000;
    uint256 expectedTokenId = 1;

    function testStartTokenId() public {
        uint256 tokenId = publication.mint(cid, price);

        Assert.equal(tokenId, expectedTokenId, "Token ID should start from 1.");
    }

    function testOwnerOf() public {
        address owner = publication.ownerOf(expectedTokenId);
        Assert.equal(owner, msg.sender, "Owners are different.");
    }

    function testGetPrice() public {
        uint256 tokenId = publication.mint(cid, price);
        uint256 stored_price = publication.getPrice(tokenId);

        Assert.equal(stored_price, price, "Price should be stored.");
    }

}
