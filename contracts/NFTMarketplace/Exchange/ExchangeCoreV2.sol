// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

// import required interfaces
import "../Interface/IERC721.sol";
import "../Interface/IERC20.sol";
import "../Interface/IMintingFactory.sol";
import "../../Registry/IAdminRegistry.sol";

contract ExchangeCoreV2 is 
    Initializable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    OwnableUpgradeable
{
    using SafeMath for uint256;

    IMintingFactory internal mintingFactory;

    address public treasury;
    address public adminRegistry;

    event FixedPricePrimarySale(
        address _nftCollection, 
        uint256 _tokenId,
        string _tokenURL,
        uint256 _nftPrice,  
        address _buyer, 
        address _buyerToken
    );

    event SignatureVerified(
        address signer
    );

    event AuctionPrimarySaleExecuted(
        address _nftCollection, 
        uint256 _tokenId,
        string _tokenURL,
        uint256 _nftPrice,  
        address _buyer, 
        address _buyerToken
    );


    modifier onlyAdmin() {
        require(
            IAdminRegistry(adminRegistry).isAdmin(msg.sender),
            "Only Admin can call this!"
        );
        _;
    }

    
    function initialize(
        IMintingFactory _mintingFactory, 
        address _adminRegistry, 
        address _treasury
    ) external initializer {
        __UUPSUpgradeable_init();
        __Ownable_init();
        __Pausable_init();
        __ReentrancyGuard_init();
        mintingFactory = IMintingFactory(_mintingFactory);
        adminRegistry = _adminRegistry;
        treasury = _treasury;
    }

    
    //@ Make validateSeller and validateBuyer as modifier later.
    function validateSeller(
        address _nftCollection,
        uint256 _tokenId,
        address _seller
    ) internal view returns (bool) {
        // check if he owns the token
        address tokenOwner = IERC721(_nftCollection).ownerOf(_tokenId);
        require(_seller == tokenOwner, "Seller does not owns the token");

        // check token approval
        address tokenApprovedAddress = IERC721(_nftCollection).getApproved(
            _tokenId
        );
        require(
            tokenApprovedAddress == address(this),
            "Contract is not approved for this NFT"
        );

        return true;
    }


    function validateBuyer(
        address _buyer, 
        uint256 _amount, 
        address _buyerToken
    ) internal view returns (bool)  {

        require(
            IERC20(_buyerToken).allowance(_buyer, address(this)) > _amount,
            "Allowance is less than the NFT's price."
        );
        require(
            IERC20(_buyerToken).balanceOf(_buyer) > _amount,
            "Buyer doesn't have sufficient funds"
        );
        return true;
    }

    function mintAndTransfer(
        address _nftCollection,
        uint256 _tokenId,
        string memory _nftId
    ) internal returns(string memory) {
        
        (bool success, string memory _tokenURL) = IMintingFactory(mintingFactory).mintNFT(_nftCollection, _tokenId, _nftId);
        
        if(success){
            IERC721(_nftCollection).transferFrom(address(mintingFactory), msg.sender, _tokenId);
        }

        return _tokenURL;
    }


    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) { return "0"; }
        uint j = _i; uint len;
        while (j != 0) { len++; j /= 10; }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) { k = k-1; uint8 temp = (48 + uint8(_i - _i / 10 * 10)); bytes1 b1 = bytes1(temp); bstr[k] = b1; _i /= 10; }
        return string(bstr);
    }

    
    function getMessageHash(
        string memory _message) internal pure returns (bytes memory) {
        return abi.encodePacked(_message);
    }


    function getEthSignedMessageHash(bytes memory _messageHash) internal pure returns (bytes32)
    {  string memory msgLength = uint2str(_messageHash.length);
        return
            keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", msgLength, _messageHash));
    }
    

    function splitSignature(bytes memory sig) internal pure returns (bytes32 r, bytes32 s, uint8 v)
    {   require(sig.length == 65, "invalid signature length");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
        return(r, s, v);
    }

    function verifySignature(
        string memory _message,
        bytes memory signature,
        address _buyer
    ) internal returns (bool) {
        bytes memory _messageHash = getMessageHash(_message);

        bytes32 ethSignedMessageHash = getEthSignedMessageHash(_messageHash);

        address signer = recoverSigner(ethSignedMessageHash, signature);

        require(signer == _buyer, "Signer doesn't match the buyer");

        emit SignatureVerified(signer);

        return (true);
    }

    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature)
        internal
        pure
        returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_ethSignedMessageHash, v, r, s);
    }


    function auctionPrimarySale(
        address _nftCollection,
        uint256 _nftPrice,
        uint256 _tokenId,
        string memory _nftId,
        address _buyer,
        address _buyerToken,
        string memory _message,
        bytes memory _signature
    ) public onlyAdmin nonReentrant whenNotPaused {
        
        bool validSignature = verifySignature(_message, _signature, _buyer);
        require(validSignature, "Signature mismatched with buyer's");

        _nftPrice *= 1e18;

        bool validBuyer = validateBuyer(_buyer, _nftPrice, _buyerToken);
        require(validBuyer, "Buyer isn't valid");

        require(IERC20(_buyerToken).allowance(_buyer, address(this)) >= _nftPrice, "Exchange is not allowed enough tokens");

        IERC20(_buyerToken).transferFrom(_buyer, treasury, _nftPrice);
       
        string memory _tokenURL  = mintAndTransfer(_nftCollection, _tokenId, _nftId);

        IMintingFactory(mintingFactory).updateOwner(_nftCollection, _buyer, _tokenId);

        emit AuctionPrimarySaleExecuted(_nftCollection, _tokenId, _tokenURL, _nftPrice ,_buyer, _buyerToken);
    }


 

    function _authorizeUpgrade(address _newImplementation) internal onlyAdmin override {}
}