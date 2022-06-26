import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.11",
  networks: {
    mumbai: {
        url: process.env.MUMBAI_URL || '',
        accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  dependencyCompiler: {
    paths: [
        '@appliedzkp/semaphore-contracts/base/Verifier.sol',
        '@worldcoin/world-id-contracts/src/Semaphore.sol',
    ],
  },
};