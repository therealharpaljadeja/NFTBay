import React, { useState, useContext, useEffect } from "react";
import { CreatorsContext } from "./CreatorsContext";
import { getCreatorObjFromAddress } from "../utils/Creators";
import { withdrawRoyalty } from "../utils/NFT";
import { Web3Context } from "./Web3Context";

export const CreatorContext = React.createContext(null);

export function CreatorContextProvider({ children }) {
	const web3Context = useContext(Web3Context);
	const { wallet } = web3Context;
	const creatorsContext = useContext(CreatorsContext);
	const { creatorAddress } = creatorsContext;
	const [creator, setCreator] = useState({});
	const [withdrawingRoyalty, setWithdrawingRoyalty] = useState(false);

	useEffect(() => {
		if (creatorAddress != null) {
			getCreatorObjUsingSigner();
		}
	}, [creatorAddress]);

	async function getCreatorObjUsingSigner() {
		getCreatorObjFromAddress(wallet, creatorAddress).then((result) => {
			setCreator(result);
		});
	}

	async function withdrawRoyaltyUsingSigner() {
		setWithdrawingRoyalty(true);
		withdrawRoyalty(creator.nftCollectionAddress, wallet);
		setWithdrawingRoyalty(false);
	}

	return (
		<CreatorContext.Provider
			value={{ creator, withdrawRoyalty, withdrawRoyaltyUsingSigner }}
		>
			{children}
		</CreatorContext.Provider>
	);
}
