import React, { useState, useContext } from "react";
import { Web3Context } from "./Web3Context";
import { CreatorsContext } from "./CreatorsContext";
import { tokenOwnedByUser } from "../utils/NFT";
import {
	createMarketItem,
	createSale,
	fetchItemsCreated,
	fetchMarketItems,
	fetchMyNFTs,
	getMarketItemByItemId,
} from "../utils/NFTMarket";

export const NFTMarketContext = React.createContext(null);

export function NFTMarketContextProvider({ children }) {
	const web3Context = useContext(Web3Context);
	const { wallet } = web3Context;
	const creatorsContext = useContext(CreatorsContext);
	const { creatorAddress } = creatorsContext;
	const [loadingNFT, setLoadingNFT] = useState(false);
	const [currentUserNFTs, setCurrentUserNFTs] = useState(null);
	const [fetchingMarketItems, setFetchingMarketItems] = useState(false);
	const [marketItems, setMarketItems] = useState(null);
	const [fetchingItemsCreated, setFetchingItemsCreated] = useState(false);
	const [currentUserNFTOnMarketplace, setCurrentUserNFTOnMarketplace] =
		useState(null);
	const [fetchingMyNFTs, setFetchingMyNFTs] = useState(false);
	const [
		currentUserNFTsBoughtOnMarketplace,
		setCurrentUserNFTsBoughtOnMarketplace,
	] = useState(null);

	const [gettingItem, setGettingItem] = useState(false);
	const [creatingMarketSale, setCreatingMarketSale] = useState(false);
	const [creatingMarketItem, setCreatingMarketItem] = useState(false);

	async function getNFTsOwnerByUserUsingSigner() {
		setLoadingNFT(true);
		let result = await tokenOwnedByUser(wallet, creatorAddress);
		setCurrentUserNFTs(result);
		setLoadingNFT(false);
	}

	async function fetchMarketItemsUsingSigner() {
		setFetchingMarketItems(true);
		let result = await fetchMarketItems(wallet);
		setMarketItems(result);
		setFetchingMarketItems(false);
	}

	async function fetchItemsCreatedUsingSigner() {
		setFetchingItemsCreated(true);
		let result = await fetchItemsCreated(wallet);
		setCurrentUserNFTOnMarketplace(result);
		setFetchingItemsCreated(false);
	}

	async function fetchMyNFTsUsingSigner() {
		setFetchingMyNFTs(true);
		let result = await fetchMyNFTs(wallet);
		setCurrentUserNFTsBoughtOnMarketplace(result);
		setFetchingMyNFTs(false);
	}

	async function createMarketItemUsingSigner(
		collectionAddress,
		tokenId,
		price
	) {
		setCreatingMarketItem(true);
		await createMarketItem(wallet, collectionAddress, tokenId, price);
		setCreatingMarketItem(false);
	}

	async function createSaleUsingSigner(collectionAddress, tokenId, price) {
		setCreatingMarketSale(true);
		await createSale(wallet, collectionAddress, tokenId, price);
		setCreatingMarketSale(false);
	}

	async function getMarketItemByIdUsingSigner(itemId) {
		setGettingItem(true);
		let nft = await getMarketItemByItemId(wallet, itemId);
		setGettingItem(false);
		return nft;
	}

	return (
		<NFTMarketContext.Provider
			value={{
				fetchingMarketItems,
				fetchingItemsCreated,
				fetchingMyNFTs,
				creatingMarketSale,
				loadingNFT,
				creatingMarketItem,
				currentUserNFTsBoughtOnMarketplace,
				createMarketItemUsingSigner,
				getMarketItemByIdUsingSigner,
				currentUserNFTs,
				currentUserNFTOnMarketplace,
				marketItems,
				fetchMarketItemsUsingSigner,
				fetchItemsCreatedUsingSigner,
				fetchMyNFTsUsingSigner,
				createSaleUsingSigner,
				getNFTsOwnerByUserUsingSigner,
			}}
		>
			{children}
		</NFTMarketContext.Provider>
	);
}
