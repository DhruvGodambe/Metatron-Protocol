// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./IERC20.sol";
import "../Registry/IAdminRegistry.sol";

contract NestedNFT is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public baseURI = "";
    address internal enoch;
    address public adminRegistry;

    constructor(string memory _name, string memory _symbol, address _enochToken, address _adminRegistry) 
        ERC721(_name, _symbol)
    {
        enoch = _enochToken;
        adminRegistry = _adminRegistry;
    }

    // mapping to keep track of NestedTokensQuantity
    // nft Id => number of Enoch
    mapping(uint256 => uint256) nftValue;

    modifier onlyAdmin() {
        require(
            IAdminRegistry(adminRegistry).isAdmin(msg.sender),
            "AdminRegistry: Restricted to admin."
        );
        _;
    }

    function mint(address _owner, uint256 _amount) public onlyAdmin returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
    
        string memory tokenURI = string(
            abi.encodePacked(baseURI, Strings.toString(newItemId))
        );
        _mint(_owner, newItemId);
        _setTokenURI(newItemId, tokenURI);
        nftValue[newItemId] = _amount;

        return newItemId;
    }

    function burn(uint256 _tokenId) public {
        _burn(_tokenId);
    }

    function setBaseURI(string memory _uri) public onlyAdmin {
        baseURI = _uri;
    }

}
