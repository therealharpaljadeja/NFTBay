const hre = require("hardhat");

async function getDeployerBalance(deployer) {
  return `Deployer Balance: ${hre.ethers.utils.formatEther(await deployer.getBalance())}`;
}

async function main() {

  const testnetAccount = await hre.reef.getSignerByName("testnet_account");
  await testnetAccount.claimDefaultAccount();

  console.log(`Deploying using address: ${testnetAccount._substrateAddress}`);

  console.log(await getDeployerBalance(testnetAccount));

  console.log("Deploying Marketplace Contract");
  const NFTMarket = await hre.reef.getContractFactory("NFTMarket", testnetAccount);
  const nftMarket = await NFTMarket.deploy();
  await nftMarket.deployed();

  console.log(await getDeployerBalance(testnetAccount));
  console.log(`Marketplace Deployed at ${nftMarket.address}`);

  console.log("Deploying Creators Contract");
  const Creators = await hre.reef.getContractFactory("Creators", testnetAccount); 
  const creators = await Creators.deploy(nftMarket.address);
  await creators.deployed();
  console.log(`Creators deployed at ${creators.address}`);

  console.log(await getDeployerBalance(testnetAccount));


  
  // console.log("Deploying a Test Creator Contract");
  // await creators.registerUser("testUser", "Test", "This is a test user", "https://www.google.com", "TestCollection", "Test", "TestToken", "TT", ethers.utils.parseUnits("100", "ether"));
  // await creators.registerUser("testUser", "Test", "This is a test user", "https://www.google.com", "TestCollection", "Test");

  
  // let creator = await creators.getCreatorAddressByUsername("testUser");
  // console.log(`Creator deployed: ${creator}`);
  // console.log(await getDeployerBalance(deployer));

  // console.log(`Getting NFTCollection address for ${creator}`);
  // let Creator = await ethers.getContractFactory("Creator");
  // let creatorContract = await Creator.attach(creator);

  // let nftContractAddress = await creatorContract.nftCollectionAddress();
  // console.log(`NFTCollection for ${creator} is deployed at ${nftContractAddress}`);

  // let tokenAddress = await creatorContract.tokenAddress();
  // console.log(`Token for ${creator} is deployed at ${tokenAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
