require("@reef-defi/hardhat-reef");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    reef: {
      url: "ws://127.0.0.1:9944",
    },
    reef_testnet: {
      url: "wss://rpc-testnet.reefscan.com/ws",
      seeds: {
        testnet_account: "any member stadium combine company grass jar wood brown second blame rocket",
      },
    },
    reef_mainnet: {
      url: "wss://rpc.reefscan.com/ws",
      seeds: {
        mainnet_account: "<MNEMONIC_SEED>",
      },
    },
  },
};