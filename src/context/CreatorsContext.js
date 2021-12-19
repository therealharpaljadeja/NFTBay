import React, { useState, useContext, useEffect } from "react";
import { Web3Context } from "./Web3Context";
import {
	isUserRegistered,
	getCreatorAddressBySender,
	getCreatorAddressByUsername,
	registerUser,
} from "../utils/Creators";

export const CreatorsContext = React.createContext(null);

export function CreatorsContextProvider({ children }) {
	const { evmAddress, wallet } = useContext(Web3Context);
	const [checkingUserRegistered, setCheckingUserRegistered] = useState(false);
	const [userRegistered, setUserRegistered] = useState(null);
	const [creatorAddress, setCreatorAddress] = useState(null);

	useEffect(() => {
		if (evmAddress != null && wallet != null) {
			setCheckingUserRegistered(true);
			const init = async () => {
				checkUserRegistered().then((result) => {
					setUserRegistered(result);
					setCheckingUserRegistered(false);
				});
			};
			init();
		}
	}, [evmAddress, wallet]);

	useEffect(() => {
		if (userRegistered != false && wallet != null) {
			getCreatorAddressBySenderUsingSigner();
		}
	}, [userRegistered]);

	async function checkUserRegistered() {
		let result = await isUserRegistered(wallet, evmAddress);
		return result;
	}

	async function getCreatorAddressFromUsername(username) {
		let result = await getCreatorAddressByUsername(wallet, username);
		return result;
	}

	async function registerCreator(creator) {
		const result = await registerUser(wallet, creator);
		if (result.hash != undefined) {
			setUserRegistered(true);
		}
	}

	async function getCreatorAddressBySenderUsingSigner() {
		getCreatorAddressBySender(wallet).then((result) => {
			setCreatorAddress(result);
		});
	}

	return (
		<CreatorsContext.Provider
			value={{
				checkingUserRegistered,
				userRegistered,
				creatorAddress,
				getCreatorAddressFromUsername,
				registerCreator,
				checkUserRegistered,
			}}
		>
			{children}
		</CreatorsContext.Provider>
	);
}
