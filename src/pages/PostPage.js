import { VStack, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import { useEffect, useContext, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import { useParams } from "react-router-dom";
import { NFTContext } from "../context/NFTContext";
import { NFTMarketContext } from "../context/NFTMarketContext";

function PostPage() {
	const { creator, address, itemId, id } = useParams();
	const web3Context = useContext(Web3Context);
	const nftContext = useContext(NFTContext);
	const nftMarketContext = useContext(NFTMarketContext);
	const { nftMetadataUsingSigner, gettingMetadata } = nftContext;
	const { getMarketItemByIdUsingSigner } = nftMarketContext;
	const [nft, setNFT] = useState(null);
	useEffect(async () => {
		if (id != null) {
			let nft = await nftMetadataUsingSigner(creator, address, id);
			setNFT(nft);
		} else {
			let nft = await getMarketItemByIdUsingSigner(itemId);
			setNFT(nft);
		}
	}, []);

	return (
		<VStack spacing={0} alignItems="center" width="100%">
			{nft != null ? (
				<Post
					nft={nft}
					id={id !== null ? id : itemId}
					isExpanded={false}
				/>
			) : (
				<Spinner />
			)}
			{/* <Tabs isFitted width="100%">
                <TabList>
                    <Tab>Comments</Tab>
                    <Tab>Bids</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Comment />
                        <Comment />
                        <Comment />
                    </TabPanel>
                    <TabPanel padding={0}>
                        <BidHeader />
                        <VStack width="100%" padding={4}>
                            <Bid />
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </Tabs> */}
		</VStack>
	);
}

export default PostPage;
