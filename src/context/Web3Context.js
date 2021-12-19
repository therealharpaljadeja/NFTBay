import React, { useEffect, useState } from "react";

import { Provider, Signer as EvmSigner } from "@reef-defi/evm-provider";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { WsProvider } from "@polkadot/rpc-provider";

export const Web3Context = React.createContext(undefined);

export function Web3ContextProvider({ children }) {
	const URL = "wss://rpc-testnet.reefscan.com/ws";

	const [injectedAccounts, setInjectedAccounts] = useState([]);
	const [accountSigner, setAccountSigner] = useState(null);
	const [extensions, setExtensions] = useState(null);

	const [accountId, setAccountId] = useState(null);
	const [evmAddress, setEvmAddress] = useState(null);
	const [evmProvider, setEvmProvider] = useState(null);

	const [wallet, setWallet] = useState(null);

	const [isProviderLoading, setIsProviderLoading] = useState(true);
	const [chainId, setChainId] = useState(null);
	const [account, setAccount] = useState(null);

	useEffect(() => {
		// Polkadot.js extension initialization as per https://polkadot.js.org/docs/extension/usage/
		const injectedPromise = web3Enable("nftbay");
		const evmProvider = new Provider({
			provider: new WsProvider(URL),
		});

		setEvmProvider(evmProvider);

		// evmProvider.api.on("connected", () => setIsApiConnected(true));
		// evmProvider.api.on("disconnected", () => setIsApiConnected(false));

		// Populate account dropdown with all accounts when API is ready
		evmProvider.api.on("ready", async () => {
			try {
				await injectedPromise
					.then(() => web3Accounts())
					.then((accounts) =>
						accounts.map(({ address, meta }) => ({
							address,
							meta: {
								...meta,
								name: `${meta.name || "unknown"} (${
									meta.source === "polkadot-js"
										? "extension"
										: meta.source
								})`,
							},
						}))
					)
					.then((accounts) => {
						setInjectedAccounts(accounts);
						setAccountId(accounts[0].address);
					})
					.catch((error) => {
						console.error("web3Enable", error);
						return [];
					});
			} catch (error) {
				console.error("Unable to load chain", error);
			}
		});

		// Setup Polkadot.js signer
		injectedPromise
			.then(async (extensions) => {
				setExtensions(extensions);
				setAccountSigner(extensions[0]?.signer);
			})
			.catch((error) => console.error(error));
	}, []);

	useEffect(() => {
		if (wallet) {
			evmProvider.api.isReady.then(() => {
				evmProvider.api.query.evmAccounts
					.evmAddresses(accountId)
					.then(async (result) => {
						if (result.isEmpty) {
							await wallet.claimDefaultAccount();
							setEvmAddress(await wallet.getAddress());
						} else {
							setEvmAddress(result.toString());
						}
					});
			});
		} else {
			setEvmAddress(null);
		}
	}, [wallet]);

	useEffect(() => {
		if (accountId && evmProvider && accountSigner) {
			setWallet(new EvmSigner(evmProvider, accountId, accountSigner));
		}
	}, [accountId]);

	return (
		<Web3Context.Provider
			value={{
				isProviderLoading,
				chainId,
				account,
				accountId,
				evmAddress,
				wallet,
				injectedAccounts,
				setAccountId,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
}
