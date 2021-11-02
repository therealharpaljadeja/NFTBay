import { useState, useContext } from "react";
import CustomModal from "./CustomModal";
import { VStack, FormControl, FormLabel, Input, Textarea, Image } from "@chakra-ui/react";
import { Web3Context } from "../context/Web3Context";
import { NFTStorage, File } from "nft.storage";

const client = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_API_KEY });

function MintNFTModal({ isOpen, onClose }) {

    const [ isImageUploaded, _ ] = useState(false);
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ fileObj, setFileObj ] = useState(null);


    const web3Context = useContext(Web3Context);
    const { mintNFTUsingSigner, isMintingNFT } = web3Context;

    const handleImageUpload = async ({ target }) => {
        console.log(target.files[0])
        if(target.files && target.files[0]) {
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(target.files[0]);
            reader.onloadend = async () => {
                let imageData = Buffer(reader.result);
                let fileObj = new File([imageData], target.files[0].name, { type: "image/*" });
                setFileObj(fileObj);
            }
        }
    }

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    }

    const handleMintNFT = async () => {
        const metadata = await client.store({
            name: title,
            description,
            image: fileObj
        });

        console.log(metadata.url);
        let metadataSplit = metadata.url.split("/", 4);
        const url = "https://ipfs.io/ipfs/" + metadataSplit[metadataSplit.length - 2] + '/'+ metadataSplit[metadataSplit.length - 1];
        mintNFTUsingSigner(url);
    }

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} modalHeader="Mint NFT" modalCloseButton={true} modalButtonOnClick={handleMintNFT} modalFooterButtonText="Mint" modalButtonLoadingState={isMintingNFT}>
            <VStack spacing={5} alignItems="flex-start">
                {
                    isImageUploaded ?
                    <Image />
                    :
                    null
                }
                <FormControl>
                    <FormLabel>Image</FormLabel>
                    <Input onChange={handleImageUpload} type="file" />
                </FormControl>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input onChange={(e) => handleInputChange(e, setTitle)} value={title} />
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea onChange={(e) => handleInputChange(e, setDescription)} value={description} />
                </FormControl>
            </VStack>
        </CustomModal>
    );
}

export default MintNFTModal;