const { ethers } = require("hardhat");

const localChainId = "31337";



module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  // Step 1. Deploy NFT marketplace contract 
  // Step2. Deploy sharedNFTLogic contract 
  let nftLogic = "<enter address>";
  // Step3. Deploy erc721 with sharedlogic contract address
  let erc721 = "<enter deployed nft contract address>"
  // Step4. Deploy Token Factory with erc721 address

  /// / let marketplaceAddress = "0x5807574C534393dFD4094386b30C89fA2104baF2"; //fuji
  let NFTmarket = "0x6222518591eDB175CFA534cB118db817453Ac5DA"; //fuji
  //  let sharednftlogic = "0x0220dB1072f3673c1035CAE6c07e12d36C6f7952"; //fuji
  //const dynamic = "0x08CBf0A3ffEe33298fe3d26F624DA19B7bee9FC7"; // fuji
  /// / let static = "0xfB01957930521a6a2d83dBC0311d08574A6F6b64"; //fuji
  //let ERC721Static = "0x529e79CB6B4808F98A377B8a8fee1Ce30983e379"; //fuji

  // NFT ERC721-S
  // Deploy Config
  // let _name = "The Buny";
  // let _symbol = "BUNY";

  // Deploy
  //erc20 Factory "0x679859E5D29c74145aD0624A2c695B8EA6B23098"; //fuji
  await deploy("NFT", {
    from: deployer,
    args: [NFTmarket],
    log: true,
    waitConfirmations: 2,
  });

  const NFT = await ethers.getContract("NFT", deployer);
};
module.exports.tags = ["NFT"];
