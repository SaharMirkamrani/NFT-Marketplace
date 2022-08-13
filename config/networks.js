const { resolve } = require("path");
const { config: dotenvConfig } = require("dotenv");

dotenvConfig({ path: resolve(__dirname, "../.env") });

const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY_URL;
if (typeof ALCHEMY_KEY === "undefined") {
  throw new Error(`ALCHEMY_API_KEY_URL must be a defined environment variable`);
}

const alchemyUrl = (network) =>
  `https://eth-${network}.alchemyapi.io/v2/${ALCHEMY_KEY}`;

/**
 * All supported network names
 * To use a network in your command use the value of each key
 *
 * e.g.
 *
 * $ yarn deploy:network mainnet
 *
 * $ npx hardhat run scripts/deploy.ts --network polygon-mainnet
 */
const networks = {
  // ETHEREUM
  mainnet: {
    chainId: 1,
    url: alchemyUrl("mainnet"),
  },
  kovan: {
    chainId: 42,
    url: alchemyUrl("kovan"),
  },
  goerli: {
    chainId: 5,
    url: alchemyUrl("goerli"),
  },
  rinkeby: {
    chainId: 4,
    url: alchemyUrl("rinkeby"),
  },
  ropsten: {
    chainId: 3,
    url: alchemyUrl("ropsten"),
  },
  sepolia: {
    chainId: 11155111,
    url: "",
  },

  // BINANCE SMART CHAIN
  bsc: {
    chainId: 56,
    url: "https://bsc-dataseed1.defibit.io/",
  },
  "bsc-testnet": {
    chainId: 97,
    url: "https://data-seed-prebsc-2-s1.binance.org:8545/",
  },

  // MATIC/POLYGON
  "polygon-mainnet": {
    chainId: 137,
    url: alchemyUrl("polygon-mainnet"),
  },
  "polygon-mumbai": {
    chainId: 80001,
    url: alchemyUrl("polygon-mumbai"),
  },

  // OPTIMISM
  "optimism-mainnet": {
    chainId: 10,
    url: alchemyUrl("optimism-mainnet"),
  },
  "optimism-kovan": {
    chainId: 69,
    url: alchemyUrl("optimism-kovan"),
  },

  // ARBITRUM
  "arbitrum-mainnet": {
    chainId: 42161,
    url: alchemyUrl("arbitrum-mainnet"),
  },
  "arbitrum-rinkeby": {
    chainId: 421611,
    url: alchemyUrl("arbitrum-rinkeby"),
  },

  // AVALANCHE
  "avalanche-mainnet": {
    chainId: 43114,
    url: `https://api.avax.network/ext/bc/C/rpc`,
  },
  "fuji-avalance": {
    chainId: 43113,
    url: `https://api.avax-test.network/ext/bc/C/rpc`,
  },

  // FANTOM
  "fantom-mainnet": {
    chainId: 250,
    url: `https://rpcapi.fantom.network`,
  },
  "fantom-testnet": {
    chainId: 4002,
    url: `https://rpc.testnet.fantom.network`,
  },
};

module.exports = {
  networks,
};
