// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import "./GiftCard.sol";
import "./../Registry/IAdminRegistry.sol";


//Requirements
/*
1. Create gift card function. Takes ERC20 tokens (USDC,etc), Mint gift card contract, TransferFrom ERC20 tokens
    to gift card contract
*/





contract TestCollectionBeaconFactory {

    UpgradeableBeacon immutable beacon;
    address public adminRegistry;
    address public giftCard;
    
    mapping(uint256 => address) private giftCards;

    constructor(address _giftCard, address _adminRegistry) {
        beacon = new UpgradeableBeacon(giftCard);
        giftCard = _giftCard;
        adminRegistry = _adminRegistry;
    }

    modifier onlyAdmin() {
        require(
            IAdminRegistry(adminRegistry).isAdmin(msg.sender),
            "Only Admin can call this!"
        );
        _;
    }

    function createGiftCardProxy(uint256 x) external onlyAdmin returns (address) {
        BeaconProxy proxy = new BeaconProxy(address(beacon), 
            abi.encodeWithSelector(GiftCard(address(0)).initialize.selector)
        );
        giftCards[x] = address(proxy);
        return address(proxy);
    }

    function updateImplementation(address _giftCard) public onlyAdmin {
        beacon.upgradeTo(_giftCard);
        giftCard = _giftCard;
    }

    function getImplementation() public view returns (address) {
        return beacon.implementation();
    }

     function getBeaconFactory() public view returns (address) {
        return address(beacon);
    }

     function getGiftCardProxy(uint256 x) public view returns (address) {
        return giftCards[x];
    }


}