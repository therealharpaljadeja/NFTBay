import React, { useState, useContext } from "react";
import { Web3Context } from "./Web3Context";
import { CreatorsContext } from "./CreatorsContext";

import {
	approveToMarketplace,
	mintNFT,
	tokenMetadata,
	withdrawRoyalty,
} from "../utils/NFT";

export const NFTContext = React.createContext(null);

export function NFTContextProvider({ children }) {
	const web3Context = useContext(Web3Context);
	const creatorsContext = useContext(CreatorsContext);
	const { wallet } = web3Context;
	const { creatorAddress } = creatorsContext;
	const [isMintingNFT, setIsMintingNFT] = useState(false);
	const [gettingMetadata, setGettingMetadata] = useState(null);
	const [approvingToMarketplace, setApprovingToMarketplace] = useState(false);

	async function mintNFTUsingSigner(tokenURI, royaltyPercentage) {
		setIsMintingNFT(true);
		let result = await mintNFT(
			wallet,
			creatorAddress,
			tokenURI,
			royaltyPercentage
		);
		setIsMintingNFT(false);
	}

	async function nftMetadataUsingSigner(
		creatorAddress,
		collectionAddress,
		tokenId
	) {
		setGettingMetadata(true);
		let nft = await tokenMetadata(
			wallet,
			creatorAddress,
			collectionAddress,
			tokenId
		);
		setGettingMetadata(false);
		return nft;
	}

	async function approveToMarketplaceUsingSigner(collectionAddress, tokenId) {
		setApprovingToMarketplace(true);
		await approveToMarketplace(wallet, collectionAddress, tokenId);
		setApprovingToMarketplace(false);
	}

	return (
		<NFTContext.Provider
			value={{
				isMintingNFT,
				approvingToMarketplace,
				gettingMetadata,
				mintNFTUsingSigner,
				nftMetadataUsingSigner,
				approveToMarketplaceUsingSigner,
			}}
		>
			{children}
		</NFTContext.Provider>
	);
}
