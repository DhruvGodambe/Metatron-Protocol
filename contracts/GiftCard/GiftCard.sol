// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./../NFTMarketplace/Interface/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract GiftCard is
    Initializable
{

    using SafeMath for uint256;
    address public factory;
    address public user;
    address public spender;

    mapping(address => uint256) public tokenBalanceInDataCard; //token's address

    event SingleTokenTransferred(address _to, uint256 _amount);
    event MultiTokenTransferred(address _to, address tokens, uint256 _amount);

    function initialize(address _user) external initializer {
        factory = msg.sender;
        user = _user;
        spender = address(this);
    console.log("msg.sender is : ", msg.sender);
    console.log("address(this) is : ", address(this));
    }

    modifier onlyUser() {
        require(msg.sender == user,
        "Only User can call this!");
        _;
    }


    function topUp(address _token, address _from, uint256 _amount) public onlyUser {
        console.log("msg.sender in topUp is : ", msg.sender);

        IERC20(_token).transferFrom(_from, spender, _amount);
        tokenBalanceInDataCard[_token] = tokenBalanceInDataCard[_token].add(_amount);
    }


    function singleTokenTransfer
    (
        address _token,
        address _to,
        uint256 _amount
    ) public onlyUser returns (bool)
    {
        IERC20(_token).transfer(_to, _amount);
        tokenBalanceInDataCard[_token] = tokenBalanceInDataCard[_token].sub(_amount);

        emit SingleTokenTransferred(_to, _amount);
        return true;
    }


    function multiTokenTransfer
    (
        address[] memory _tokens,
        address _to, 
        uint256[] memory _amounts
    ) public onlyUser returns(bool)
    {

        for (uint i = 0; i < _tokens.length; i++) {
            IERC20(_tokens[i]).transfer(_to, _amounts[i]);
        tokenBalanceInDataCard[_tokens[i]] = tokenBalanceInDataCard[_tokens[i]].sub(_amounts[i]);
        emit MultiTokenTransferred(_to, _tokens[i], _amounts[i]);
        }
        return true;
    }


    function getBalance(address _token, address _account) public view returns (uint256) {
        return IERC20(_token).balanceOf(_account);
    }

}
