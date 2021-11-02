import { VStack, Heading, HStack, Button, useDisclosure } from "@chakra-ui/react";
import BuyTokenModal from "./BuyTokenModal";

function ProfileBody({ username, name, bio, nftOwned }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <BuyTokenModal isOpen={isOpen} onClose={onClose} />
            <VStack marginTop="35px !important" spacing={5} width="100%"  alignItems="center">
                <Heading size="md" fontWeight="700">{name}</Heading>
                <Heading size="sm">{bio}</Heading>
                <HStack justifyContent="center" spacing="40px" width="100%">
                    <VStack>
                        <Heading fontWeight="700" size="md">{nftOwned}</Heading>
                        <Heading size="sm">NFTs Owned</Heading>
                    </VStack>
                    {/* <VStack>
                        <Heading size="md" fontWeight="700">20</Heading>
                        <Heading size="sm">Token Holders</Heading>
                    </VStack> */}
                </HStack>
                <HStack>
                    <Button size="sm" onClick={onOpen} disabled >Buy ${username}</Button>
                    <Button disabled size="sm">Propose To DAO</Button>
                    {/* <Button disabled size="sm">Stake $DAN</Button> */}
                </HStack>
            </VStack>
        </>
    );
}

export default ProfileBody;