import Web3Modal from "web3modal";
import React, { useState, useEffect } from "react";
import {
  nftAddress,
  nftMarketplaceAddress,
} from "contracts/config/networkAddress";
import {
  Box,
  Center,
  Grid,
  GridItem,
  Button,
  WrapItem,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import Marketplace from "contracts/TheBunyProjectMarketplace.json";
import NFT from "contracts/TheBunyProjectNFT.json";
import { IconButton } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
import { Tooltip, notification, Popover, Tag } from "antd";
import { HStack, Flex, Wrap, useClipboard } from "@chakra-ui/react";
import { AutoCenter } from "antd-mobile";

function ProductPageA(nft, price) {
  const { tokenId } = useParams();
  const [contractName, setContractName] = useState();
  const [nftOwner, setNftOwner] = useState();
  const [contractSymbol, setContractSymbol] = useState();
  const [nftImage, setNftImage] = useState();
  const [nftData, setNftData] = useState();
  const [nftName, setNftName] = useState();
  const [nftDesc, setNftDesc] = useState();
  const [nftPrice, setNftPrice] = useState();
  const [nftItemId, setNftItemId] = useState();

  const content = (
    <>
      <div>
        <p>NFT: {nftName} </p>
        <p>Token Id: {tokenId}</p>
      </div>
      <div>
        <p>Current Price: {nftPrice} /AVAX</p>
      </div>
    </>
  );

  const openNotification = () => {
    notification.open({
      message: "Copied to clipboard",
      description: [
        <>
          <p style={{ fontSize: "10px" }}>
            Buny Marketplace NFT address {nftAddress}
          </p>
        </>,
      ],
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const { onCopy, hasCopied } = useClipboard(nftAddress);
  const [nftAnimation, setNftAnim] = useState();
  const [usdzFile, setUsdzFile] = useState();
  async function fetchNFT() {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://api.avax.network/ext/bc/C/rpc",
    );
    const contract = new ethers.Contract(nftAddress, NFT.abi, provider);
    const name = await contract.name(); //contract name
    setContractName(name);
    const symbol = await contract.symbol();
    setContractSymbol(symbol);
    const owner = await contract.ownerOf(tokenId); // fetch owner
    setNftOwner(owner);
    const tokenUri = await contract.tokenURI(tokenId); // nft tokenuri
    const response = await fetch(tokenUri);
    if (!response.ok) throw new Error(response.statusText);
    const json = await response.json();
    console.log(json);
    console.log(json.name);
    setNftName(json.name);
    console.log(json.description);
    setNftDesc(json.description);
    console.log(json.image);
    setNftImage(json.image);
    setNftAnim(json.animation_url);
    setUsdzFile(json.usdzFile);
    const market = new ethers.Contract(
      nftMarketplaceAddress,
      Marketplace.abi,
      provider,
    );
    const data = await market.getSpecificItem(tokenId);
    const price = ethers.utils.formatEther(data[5].toString());
    if (price > 0) {
      console.log(price);
    }
    console.log(data.toString());

    console.log(data[6].toString());
  }

  const [deployInitiate, setDeployInitiate] = useState();

  useEffect(() => {
    fetchNFT();
  }, []);

  return (
    <>
      <Box
        bg="rgba(31,41,80)"
        border={"1px solid blue"}
        mt={10}
        w={"100%"}
        maxWidth={"600px"}
        h={"100%"}
        style={{
          fontSize: "12px",
          padding: "5px",
          color: "white",
        }}
      >
        <AutoCenter>
          <Box
            mr={10}
            ml={10}
            p={15}
            fontSize="12px"
            w={"auto"}
            minWidth="390px"
            bg="rgb(243 244 246)"
            color="rgba(31,41,80)"
          >
            <Tag
              style={{
                backgroundColor: "transparent",
                border: "1px solid rgba(31,41,80)",
                color: "rgba(31,41,80)",
              }}
            >
              {nftName}
            </Tag>

            <p>
              <strong>Collection:</strong> {contractName}
            </p>
            <p>
              <strong>Symbol:</strong> {contractSymbol}
            </p>
            <p>
              <strong>Token ID:</strong> {tokenId}
            </p>
            <Box
              fontWeight="bold"
              color="black"
              h={"auto"}
              fontSize="10px"
              w={"auto"}
              lineHeight="tight"
              noOfLines={[1]}
              isTruncated
            >
              <HStack>
                <div
                  onClick={openNotification}
                  style={{
                    fontSize: "10px",
                    padding: "0px",
                    textAlign: "right",
                    color: "black",
                  }}
                >
                  <strong style={{ paddingRight: "4px" }}>Address:</strong>
                  <a
                    href={`https://snowtrace.io/address/${nftAddress}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {nftAddress}
                  </a>

                  <Tooltip title="Copy to clipboard">
                    <IconButton
                      m={2}
                      onClick={onCopy}
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Copy to clipboard"
                      icon={<CopyIcon />}
                    >
                      {hasCopied ? "Copied!" : "Copy"}
                    </IconButton>
                  </Tooltip>
                </div>
              </HStack>

              <strong style={{ paddingRight: "4px" }}>Owner:</strong>
              <a
                href={`https://snowtrace.io/address/${nftOwner}`}
                target="_blank"
                rel="noreferrer"
              >
                {nftOwner}
              </a>
            </Box>
          </Box>
        </AutoCenter>
        <Wrap justify="center">
          <WrapItem>
            <Box
              mr={10}
              ml={10}
              p={15}
              fontSize="12px"
              w={"auto"}
              minWidth="390px"
              maxWidth="390px"
              bg="rgb(243 244 246)"
              color="rgba(31,41,80)"
            >
              <Tag
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid rgba(31,41,80)",
                  color: "rgba(31,41,80)",
                }}
              >
                Description
              </Tag>
              <p style={{ padding: "15px" }}>{nftDesc}</p>
            </Box>
          </WrapItem>
        </Wrap>
        <Center>
          <div
            style={{
              backgroundColor: "white",
              width: "100%",
              margin: "10px",
            }}
          >
            <Flex>
              <Wrap justify={"center"}>
                <WrapItem bg="white" w="auto">
                  <Box
                    style={{
                      backgroundColor: "white",
                      margin: "10px",
                      height: "auto",
                      color: "white",
                      maxWidth: "600px",
                    }}
                  >
                    <Tag
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid rgba(31,41,80)",
                        color: "rgba(31,41,80)",
                      }}
                    >
                      Image
                    </Tag>
                    <Center>
                      <model-viewer
                        shadow-intensity="1"
                        style={{ width: "350px", height: "350px" }}
                        camera-controls
                        poster={nftImage}
                        //alt={`Nft Name: ${nft.name}`}
                        src={nftImage}
                      ></model-viewer>
                    </Center>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <div>
                    {nftAnimation && (
                      <Box
                        style={{
                          backgroundColor: "transparent",
                          margin: "10px",
                          height: "100%",
                          color: "white",
                          maxWidth: "900px",
                        }}
                      >
                        <Tag
                          style={{
                            backgroundColor: "transparent",
                            border: "1px solid rgba(31,41,80)",
                            color: "rgba(31,41,80)",
                          }}
                        >
                          GLB/GLTF Model
                        </Tag>
                        <Center>
                          <model-viewer
                            shadow-intensity="1"
                            style={{ width: "350px", height: "350px" }}
                            camera-controls
                            poster={nftImage}
                            src={nftAnimation}
                            usdzFile={usdzFile}
                          ></model-viewer>
                        </Center>
                      </Box>
                    )}
                  </div>
                </WrapItem>
                <WrapItem>
                  <div>
                    {usdzFile && (
                      <Box
                        style={{
                          backgroundColor: "transparent",
                          margin: "10px",
                          height: "100%",
                          color: "white",
                          maxWidth: "900px",
                        }}
                      >
                        <Tag
                          style={{
                            backgroundColor: "transparent",
                            border: "1px solid rgba(31,41,80)",
                            color: "rgba(31,41,80)",
                          }}
                        >
                          AR(Augmented Reality)
                        </Tag>
                        <Center>
                          <model-viewer
                            shadow-intensity="1"
                            style={{ width: "350px", height: "350px" }}
                            camera-controls
                            ar
                            poster={nftImage}
                            src={nftAnimation}
                            usdzFile={usdzFile}
                          ></model-viewer>
                        </Center>
                      </Box>
                    )}
                  </div>
                </WrapItem>
              </Wrap>
            </Flex>
          </div>
        </Center>
      </Box>
    </>
  );
}

export default ProductPageA;
