import {
	Grid,
	Box,
	HStack,
	VStack,
	Text,
	Heading,
	Spinner,
	Avatar,
	Button,
	Tabs,
	TabList,
	Tab,
	Spacer,
	TabPanels,
	TabPanel,
	Image,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { MdOutlineSell } from "react-icons/md";
import { useEffect } from "react";
import CustomTab from "../components/CustomTab";
import ProfileBody from "../components/ProfileBody";
import ProfileHeader from "../components/ProfileHeader";
import { Web3Context } from "../context/Web3Context";
import PostPage from "./PostPage";
import { CreatorContext } from "../context/CreatorContext";
import { NFTContext } from "../context/NFTContext";
import { NFTMarketContext } from "../context/NFTMarketContext";
import { CreatorsContext } from "../context/CreatorsContext";

function ProfilePage() {
	const web3Context = useContext(Web3Context);
	const creatorContext = useContext(CreatorContext);
	const creatorsContext = useContext(CreatorsContext);
	const nftContext = useContext(NFTContext);
	const nftMarketContext = useContext(NFTMarketContext);
	const { creator } = creatorContext;
	const { creatorAddress } = creatorsContext;
	const {
		currentUserNFTs,
		currentUserNFTOnMarketplace,
		currentUserNFTsBoughtOnMarketplace,
		fetchItemsCreatedUsingSigner,
		fetchMyNFTsUsingSigner,
		getNFTsOwnerByUserUsingSigner,
		loadingNFT,
	} = nftMarketContext;
	const {
		username,
		name,
		bio,
		profilePicUrl,
		nftCollectionName,
		nftCollectionSymbol,
	} = creator;
	const [userConnected, setUserConnected] = useState(false);

	const [userOwnedNFT, setUserOwnedNFT] = useState(null);
	useEffect(() => {
		console.log(creatorAddress);
		if (creatorAddress != null && creator != null) {
			getNFTsOwnerByUserUsingSigner();
			fetchItemsCreatedUsingSigner();
			fetchMyNFTsUsingSigner();
		}
	}, [creatorAddress]);

	useEffect(() => {
		if (
			currentUserNFTs != null &&
			currentUserNFTsBoughtOnMarketplace != null
		) {
			setUserOwnedNFT([
				...currentUserNFTs,
				...currentUserNFTsBoughtOnMarketplace,
			]);
		}
	}, [currentUserNFTs, currentUserNFTsBoughtOnMarketplace]);

	console.log(creator, currentUserNFTs);
	return (
		<VStack width="100%" padding={0}>
			{creator != null ? (
				<>
					<ProfileHeader
						username={username}
						profilePicUrl={profilePicUrl}
					/>
					{currentUserNFTs != null &&
					userOwnedNFT != null &&
					currentUserNFTOnMarketplace != null &&
					currentUserNFTsBoughtOnMarketplace != null ? (
						<ProfileBody
							royaltyEarned={creator.royaltyEarned}
							nftOwned={
								userOwnedNFT.length +
								currentUserNFTOnMarketplace.length
							}
							username={username}
							bio={bio}
							name={name}
						/>
					) : (
						<Spinner />
					)}
					<HStack justifyContent="center" width="100%">
						{loadingNFT == false &&
						currentUserNFTs != null &&
						currentUserNFTOnMarketplace != null &&
						userOwnedNFT != null ? (
							<Tabs
								colorScheme="brand"
								isFitted
								overflowX="scroll"
								width="100%"
							>
								<TabList>
									<CustomTab
										icon={<BiUser />}
										number={userOwnedNFT.length}
									/>
									<CustomTab
										icon={<MdOutlineSell />}
										number={
											currentUserNFTOnMarketplace.length
										}
									/>
								</TabList>
								<TabPanels>
									<TabPanel padding={0}>
										{currentUserNFTs != null ||
										currentUserNFTsBoughtOnMarketplace !=
											null ? (
											<Grid
												overflowY="scroll"
												gridGap="1px"
												templateColumns="repeat(3, 1fr)"
											>
												{userOwnedNFT != null ? (
													userOwnedNFT.map(
														(nft, index) => {
															let toUrl = `/nft/${nft.creatorAddress}/${nft.collectionAddress}/${nft.tokenId}`;
															return (
																<Link
																	key={
																		nft.name
																	}
																	to={toUrl}
																>
																	<Image
																		key={
																			index
																		}
																		src={
																			nft.image
																		}
																	/>
																</Link>
															);
														}
													)
												) : (
													<Heading
														pt={3}
														textAlign="center"
														size="sm"
													>
														No NFTs
													</Heading>
												)}
											</Grid>
										) : (
											<Spinner />
										)}
									</TabPanel>
									<TabPanel padding={0}>
										<Grid
											overflowY="scroll"
											gridGap="1px"
											templateColumns="repeat(3, 1fr)"
										>
											{currentUserNFTOnMarketplace !=
											null ? (
												currentUserNFTOnMarketplace.map(
													(nft) => {
														let toUrl = `/nft/marketplace/${nft.creatorAddress}/${nft.collectionAddress}/${nft.itemId}`;
														return (
															<Link
																key={nft.name}
																to={toUrl}
															>
																<Image
																	key={
																		nft.name
																	}
																	src={
																		nft.image
																	}
																/>
															</Link>
														);
													}
												)
											) : (
												<Spinner />
											)}
										</Grid>
									</TabPanel>
								</TabPanels>
							</Tabs>
						) : (
							<Spinner />
						)}
					</HStack>
				</>
			) : (
				<Spinner />
			)}
		</VStack>
	);
}
export default ProfilePage;
