import { HStack, Text, useDisclosure, IconButton } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import ProfileSettingsModal from "./ProfileSettingsModal";

function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <ProfileSettingsModal isOpen={isOpen} onClose={onClose}  />
            <HStack top={0} justifyContent="space-between" padding={4} borderBottom="1px solid" borderColor="brand.200" position="sticky" zIndex="1000" background="light.200" width="100%" height="8vh" boxShadow="0 10px 200px 6px rgba(0,0,0,.1)">
                <Text color="brand.100">MeMarket</Text>
                <IconButton onClick={onOpen} variant="ghost" colorScheme="whiteAlpha" icon={<FiSettings stroke="#aa00ff" />} />
            </HStack>
        </>
    );
}

export default Header;