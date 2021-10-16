//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract MyNFT2 is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct NFT {
        uint256 tokenId;
        string tokenURI;
    }

    // List of existing nfts
    uint256[] public nfts;
    
    mapping(uint256 => NFT) nftsMap;

    constructor() ERC721("NFT_minter", "NFTM") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
         _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        NFT storage x = nftsMap[newItemId];
        x.tokenId = newItemId;
        x.tokenURI = tokenURI;
        
        nfts.push(newItemId);

        return newItemId;
    }
    
    function getNft(uint256 tokenId) view public returns (uint256, string memory) {
        return (nftsMap[tokenId].tokenId, nftsMap[tokenId].tokenURI);
    }
    
    function nftsLength() external view returns (uint256) {
        return nfts.length;
    }
    
    function ownedNfts(address _address) public view returns (NFT[] memory) {
        uint256 nftCount = balanceOf(_address);
        if (nftCount == 0) {
            return new NFT[](0);
        } else {
            NFT[] memory result = new NFT[](nftCount);
            uint256 totalNfts = nfts.length;
            uint256 resultIndex = 0;
            uint256 nftId = 1;
            while (nftId <= totalNfts) {
                if (ownerOf(nftId) == _address) {
                    result[resultIndex] = NFT(nftsMap[nftId].tokenId, nftsMap[nftId].tokenURI);
                    resultIndex = resultIndex + 1;
                }
                nftId = nftId + 1;
            }
            return result;
        }
    }
}
