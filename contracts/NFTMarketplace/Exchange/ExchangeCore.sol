// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface MintingFactory {
    function updateOwner(
        address _nftContract,
        uint256 _tokenId,
        address _newOwner
    ) external;
}

interface IERC721 {
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 indexed _tokenId
    );

    event Approval(
        address indexed _owner,
        address indexed _approved,
        uint256 indexed _tokenId
    );

    event ApprovalForAll(
        address indexed _owner,
        address indexed _operator,
        bool _approved
    );

    function balanceOf(address _owner) external view returns (uint256);

    function ownerOf(uint256 _tokenId) external view returns (address);

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes calldata data
    ) external payable;

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable;

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external payable;

    function approve(address _approved, uint256 _tokenId) external payable;

    function setApprovalForAll(address _operator, bool _approved) external;

    function getApproved(uint256 _tokenId) external view returns (address);

    function isApprovedForAll(address _owner, address _operator)
        external
        view
        returns (bool);
}

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract ExchangeCore {
    MintingFactory internal mintingFactory;
    IERC20 internal WETH;

    constructor(MintingFactory _mintingFactory, IERC20 _weth) {
        mintingFactory = MintingFactory(_mintingFactory);
        WETH = IERC20(_weth);
    }

    function executeOrder(
        address _nftContract,
        uint256 _tokenId,
        address _buyer,
        address _seller,
        uint256 _amount
    ) public returns (address newOwner, uint256 tokenId) {
        require(
            IERC20(WETH).allowance(_buyer, address(this)) > _amount,
            "Allowance is less than the NFT's price."
        );
        // transferring the amount to the seller
        IERC20(WETH).transferFrom(_buyer, _seller, _amount);
        // transferring the NFT to the buyer
        IERC721(_nftContract).transferFrom(_seller, _buyer, _tokenId);
        // updating the NFT ownership in our Minting Factory
        MintingFactory(mintingFactory).updateOwner(
            _nftContract,
            _tokenId,
            _buyer
        );

        return (_buyer, _tokenId);
    }

    // function=> placeOrder (nftCollection, tokenId)
    //   primary market - nft's listing price -. min price bid, auction time in web2
    //      approve weth amt to exchange contract
    // function=> putOnAuction (nftCollection, tokenId)
    //      approve nft to exchange contract
    // function executeOrder(nftCollection, tokenId, buyer, amt)
    //      transfer bid amt to seller
    //      transfer nft to buyer
    //      who will pay Gas Fee ??    ***
    //      update nft owner in Minting Factory
    //      Takes Marketplace fee  (First time : Auction fee)
}

// place Order => sell order / buy order (nftCollection, tokenId)
// =>
// approve (amt to Exchange)  // require => min amt limit  => auctionTime
//
// validation => signature, buyer address, auctionTime
// => calls execute order(signature) internal fn
//      => update owner of NFT in Minting Factory (Interface)
//      => Royalties distribution
