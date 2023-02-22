import React, { useState, useEffect } from "react";
import {
  TBunyNftAddress,
  TBunyMarketplaceAddress,
} from "contracts/config/networkAddress";
import { Box, Center, VStack, WrapItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import Marketplace from "contracts/TBunyMarketplace.json";
import NFT from "contracts/TBunyNft.json";
import { IconButton } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { Image, Tooltip, notification, Tag } from "antd";
import { HStack, Flex, Wrap, useClipboard } from "@chakra-ui/react";
import { AutoCenter } from "antd-mobile";

function TBunyPage(nft, price) {
  const { tokenId } = useParams();
  const [contractName, setContractName] = useState();
  const [nftOwner, setNftOwner] = useState();
  const [contractSymbol, setContractSymbol] = useState();
  const [nftImage, setNftImage] = useState();
  const [nftData, setNftData] = useState();
  const [nftName, setNftName] = useState();
  const [nftDesc, setNftDesc] = useState();
  const [nftMsrp, setNftMsrp] = useState();
  const [nftStrain, setNftStrain] = useState();
  const [batch, setBatch] = useState();
  const [license, setLicense] = useState();
  const [type, setType] = useState();
  const [origin, setOrigin] = useState();
  const [totalThc, setTotalThc] = useState();
  const [totalCbd, setTotalCbd] = useState();
  const [growType, setGrowType] = useState();
  const [solvents, setSolvents] = useState();
  const [weight, setWeight] = useState();
  const [youtube, setYoutube] = useState();
  const [external, setExternal] = useState();
  const [isOrganic, setOrganic] = useState();
  const [manufacturer, setManufacturer] = useState();
  const [universalSymbol, setUniversalSymbol] = useState();

  const openNotification = () => {
    notification.open({
      message: "Copied to clipboard",
      description: [
        <>
          <p style={{ fontSize: "10px" }}>
            Buny Marketplace NFT address {TBunyNftAddress}
          </p>
        </>,
      ],
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const { onCopy, hasCopied } = useClipboard(TBunyNftAddress);
  const [nftAnimation, setNftAnim] = useState();

  async function fetchNFT() {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://api.avax.network/ext/bc/C/rpc",
    );
    const contract = new ethers.Contract(TBunyNftAddress, NFT.abi, provider);
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
    setYoutube(json.youtube_url);
    setExternal(json.external_url);
    setNftAnim(json.animation_url);
    setNftStrain(json.strain);
    setNftMsrp(json.msrp);
    setBatch(json.batchNumber);
    setLicense(json.licenseNumber);
    setType(json.thcType);
    setOrigin(json.origin);
    setGrowType(json.growType);
    setTotalCbd(json.totalCBD);
    setTotalThc(json.totalTHC);
    setSolvents(json.solvents);
    setWeight(json.weight);
    setOrganic(json.isOrganic);
    setManufacturer(json.manufacturer);
    setUniversalSymbol(json.universalSymbol);

    const market = new ethers.Contract(
      TBunyMarketplaceAddress,
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
              Nft Item
            </Tag>

            <div>Item: {nftName}</div>

            <div>Collection: {contractName}</div>
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
              <Image width="100px" src={universalSymbol} />

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
                  <strong style={{ paddingRight: "4px", fontSize: "10px" }}>
                    Contract:
                  </strong>
                  <a
                    href={`https://snowtrace.io/address/${TBunyNftAddress}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {TBunyNftAddress}
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

              <strong style={{ paddingRight: "4px", fontSize: "10px" }}>
                Owner:
              </strong>
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
          <WrapItem bg="white" w="auto">
            <Box
              w="100%"
              style={{
                backgroundColor: "white",
                //margin: "10px",
                minWidth: "390px",
                padding: "5px",
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
                  margin: "10px",
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
            <VStack>
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
                  External Links
                </Tag>
                <div>
                  Youtube:{" "}
                  <a href={youtube} target="_blank">
                    {youtube}
                  </a>{" "}
                </div>
                <div>
                  Homepage:{" "}
                  <a href={external} target="_blank">
                    {external}
                  </a>{" "}
                </div>
              </Box>
            </VStack>
          </WrapItem>
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
                Details
              </Tag>
              <div>Manufacturer: {manufacturer}</div>
              <div>Strain: {nftStrain}</div>
              <div>MSRP: {nftMsrp}</div>
              <div>License #: {license}</div>
              <div>Batch #: {batch}</div>
              <div>Type: {type}</div>
              <div>Origin: {origin}</div>
              <div>Is Organic? {isOrganic}</div>
              <div>Total THC: {totalThc}%</div>
              <div>Total CBD: {totalCbd}%</div>
              <div>Weight: {weight}</div>
              <div>Grow Type: {growType} </div>
              <div>Solvents: {solvents}</div>
            </Box>
          </WrapItem>
        </Wrap>
        <Center>
          <Flex>
            <Wrap>
              <WrapItem justify="center">
                <div>
                  <Center bg="white">
                    {nftAnimation && (
                      <>
                        <Box w="390px" p={10}>
                          <VStack>
                            <model-viewer
                              shadow-intensity="1"
                              style={{ width: "350px", height: "350px" }}
                              camera-controls
                              poster={nftImage}
                              src={nftAnimation}
                            ></model-viewer>
                            <Tag
                              style={{
                                backgroundColor: "transparent",
                                border: "1px solid rgba(31,41,80)",
                                color: "rgba(31,41,80)",
                              }}
                            >
                              *3D Item representation may not be scaled to size.
                            </Tag>
                          </VStack>
                        </Box>
                      </>
                    )}
                  </Center>
                </div>
              </WrapItem>
            </Wrap>
          </Flex>
        </Center>
      </Box>
    </>
  );
}

export default TBunyPage;
