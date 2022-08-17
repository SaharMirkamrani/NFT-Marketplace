require("dotenv").config();
const ethers = require("ethers");

const ALCHEMY_API_KEY_URL = process.env.API_KEY;

const provider = new ethers.providers.AlchemyProvider(
  "rinkeby",
  ALCHEMY_API_KEY_URL
);

const SimpleNFT = require("../artifacts/contracts/SimpleNFT.sol/SimpleNFT.json");
const NFTMarketplace = require("../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json");

const privateKey = process.env.PRIVATE_KEY_2;
const signer = new ethers.Wallet(privateKey, provider);

const SimpleNFTAbi = SimpleNFT.abi;
const NFTMarketplaceAbi = NFTMarketplace.abi;
const SimpleNFTAddress = "0xAD62de4Eabd00a084FCD1ce2D9E3A52951C42003";
const NFTMarketplaceAddress = "0x3015982536FFCF934484a8A81d757dAe81849F79";

const NftContract = new ethers.Contract(SimpleNFTAddress, SimpleNFTAbi, signer);
const NFTMarketplaceContract = new ethers.Contract(
  NFTMarketplaceAddress,
  NFTMarketplaceAbi,
  signer
);

const PRICE = ethers.utils.parseEther("0.01");

const mintNFT = async () => {
  let nftTxn = await NftContract.mint({
    value: ethers.utils.parseEther("0.001"),
  });
  const mintTxReceipt = await nftTxn.wait(1);
  const tokenId = mintTxReceipt.events[0].args.tokenId;
  console.log(tokenId);
  const approvalTx = await NftContract.approve(
    NFTMarketplaceContract.address,
    tokenId
  );
  await approvalTx.wait(1);

  console.log(
    `NFT Minted! Check it out at: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
  );

  let Txn = await NFTMarketplaceContract.listItem(
    SimpleNFTAddress,
    tokenId,
    PRICE
  );
  await Txn.wait();
  console.log(
    `NFT Listed! Check it out at: https://rinkeby.etherscan.io/tx/${Txn.hash}`
  );
};

mintNFT()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
