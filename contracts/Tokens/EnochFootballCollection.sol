// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EnochFootballCollection is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string private baseURI;
    string public contractURI;

    constructor(string memory initialBaseURI, string memory initialContractURI) ERC721("Enoch: Football Collection", "EFB") {
        baseURI = initialBaseURI;
        contractURI = initialContractURI;
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseURI = newBaseURI;
    }

    function setContractURI(string memory newContractURI) external onlyOwner {
        contractURI = newContractURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked(baseURI, uint2str(tokenId), ".json"));
    }

    function mintNFT(address recipient) public onlyOwner returns (uint256) {
        uint256 newItemId = _tokenIds.current() + 1;

        _safeMint(recipient, newItemId);
        _tokenIds.increment();

        return newItemId;
    }

    function mintBatch(address recipient, uint256 amount) public onlyOwner {
        require(amount > 0, "Amount should be greater than 0");

        for (uint256 i = 0; i < amount; i++) {
            mintNFT(recipient);
        }
    }

    function uint2str(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function getBaseURI() public view returns (string memory) {
        return baseURI;
    }

    function getContractURI() public view returns (string memory) {
        return contractURI;
    }
}
