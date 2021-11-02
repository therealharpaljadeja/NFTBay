// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "./NFT.sol";
import "./Token.sol";

contract Creator { 
    string public username;
    string public name;
    string public bio;
    string public profilePicUrl;
    string public nftCollectionName;
    string public nftCollectionSymbol;
    // string public tokenName;
    // string public tokenSymbol;
    // uint256 public totalSupply;

    address public nftCollectionAddress;
    // address public tokenAddress;

    constructor(
        string memory _username, 
        string memory _name, 
        string memory _bio,
        string memory _profilePicUrl,
        string memory _nftCollectionName,
        string memory _nftCollectionSymbol
        // string memory _tokenName,
        // string memory _tokenSymbol,
        // uint256 _totalSupply
    ) {
        name = _name;
        username = _username;
        bio = _bio;
        profilePicUrl = _profilePicUrl;
        nftCollectionName = _nftCollectionName;
        nftCollectionSymbol = _nftCollectionSymbol;
        // tokenName = _tokenName;
        // tokenSymbol = _tokenSymbol;
        // totalSupply = _totalSupply;

        // Token token = new Token(_tokenName, _tokenSymbol, _totalSupply);
        // token.transfer(msg.sender, token.balanceOf(address(this)));
        // token.transferOwnership(msg.sender);

        // tokenAddress = address(token);
        NFT nftCollection = new NFT(nftCollectionName, nftCollectionSymbol);
        nftCollectionAddress = address(nftCollection);
    }
}