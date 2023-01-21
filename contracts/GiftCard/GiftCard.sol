// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./../NFTMarketplace/Interface/IERC20.sol";
import "./../Registry/IAdminRegistry.sol";

contract GiftCard is
    Initializable
{

    using SafeMath for uint256;
    address public factory;
    address public adminRegistry;


    event SingleTokenTransferred(address _to, uint256 _amount);
    event MultiTokenTransferred(address _to, address tokens, uint256 _amount);

    function initialize(address _adminRegistry) external initializer {
        factory = msg.sender;
        adminRegistry = _adminRegistry;
    console.log("msg.sender is : ", msg.sender);
    console.log("address(this) is : ", address(this));
    }

    modifier onlyAdmin() {
        require(
            IAdminRegistry(adminRegistry).isAdmin(msg.sender),
            "Only Admin can call this!"
        );
        _;
    }


    function singleTokenTransfer
    (
        address _token,
        address _to,
        uint256 _amount
    ) public onlyAdmin returns (bool)
    {
        IERC20(_token).transfer(_to, _amount);

        emit SingleTokenTransferred(_to, _amount);
        return true;
    }


    function multiTokenTransfer
    (
        address[] memory _tokens,
        address _to, 
        uint256[] memory _amounts
    ) public onlyAdmin returns(bool)
    {

        for (uint i = 0; i < _tokens.length; i++) {
            IERC20(_tokens[i]).transfer(_to, _amounts[i]);

        emit MultiTokenTransferred(_to, _tokens[i], _amounts[i]);
        }
        return true;
    }


    function getBalance(address _token) public view returns (uint256) {
        return IERC20(_token).balanceOf(address(this));
    }

    function getSingleTokenAllowance(address _token, address _tokenOwner) public view returns (uint256) {
        return IERC20(_token).allowance(_tokenOwner, address(this));
    }

    function getMultiTokenAllowance
    (
        address[] memory _tokens,
        address[] memory _tokenOwners
    ) public view returns(uint[] memory)
    {

        uint[] memory myArray = new uint[](_tokens.length);
        for (uint i = 0; i < _tokens.length; i++) {
            myArray[i] = IERC20(_tokens[i]).allowance(_tokenOwners[i], address(this));
        }
    return myArray;
    }

}
