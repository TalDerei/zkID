import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.11",
  networks: {
      testnet: {
        url: `https://rpc-mumbai.maticvigil.com`,
        accounts: [process.env.TESTNET_PRIVATE_KEY],
      },
      optimism: {
        url: `https://kovan.optimism.io/`,
        accounts: [process.env.TESTNET_PRIVATE_KEY],
      },
  },
  dependencyCompiler: {
    paths: [
        '@appliedzkp/semaphore-contracts/base/Verifier.sol',
        '@worldcoin/world-id-contracts/src/Semaphore.sol',
    ],
  },
};
