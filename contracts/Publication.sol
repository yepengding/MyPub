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

    mapping(uint256 => uint256) private prices;
    mapping(address => uint) private balances;

    event Published(address indexed _from, uint256 _id, uint256 _price);
    event Paid(address indexed _from, uint256 _id);

    constructor() ERC721("Publication", "PUB") public {
        _setBaseURI("http://localhost:8080/ipfs/");
    }

    // Mint an NFT from a publication
    function mint(string memory _cid, uint256 _price) public returns (uint256) {
        _id.increment();

        uint256 newId = _id.current();
        _mint(msg.sender, newId);
        _setTokenURI(newId, _cid);

        emit Published(msg.sender, newId, _price);
        prices[newId] = _price;
        return newId;
    }

    // Purchase a publication
    function purchase(uint256 _token_id) public payable {
        require(prices[_token_id] == msg.value, "Payment amount is not right.");
        address owner = ownerOf(_token_id);
        balances[owner] += msg.value;
        emit Paid(msg.sender, _token_id);
    }

    // Withdraw gains
    function withdrawAmount(uint256 amount) public {
        require(amount <= balances[msg.sender], "Cannot withdraw more than current balance.");
        balances[msg.sender] -= amount;
        msg.sender.transfer(amount);
    }

    function getPrice(uint256 _token_id) public view returns (uint256) {
        return prices[_token_id];
    }

}
