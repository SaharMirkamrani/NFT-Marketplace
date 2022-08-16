"use strict";

const { ethers } = require("hardhat");
const { toWei } = require("../utils/format");
const { verifyContract } = require("../utils/verify");

async function main() {
  const { chainId } = await ethers.provider.getNetwork();

  const contractName = "Token";
  const contractPath = `contracts/${contractName}.sol:${contractName}`;
  const contractAddress = "";
  const args = [
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  ];

  // You don't want to verify on localhost
  if (chainId != 31337 && chainId != 1337) {
    await verifyContract({
      contractPath,
      contractAddress,
      args,
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
