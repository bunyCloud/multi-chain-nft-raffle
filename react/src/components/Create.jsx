import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
//import Chains from "./Chains";
import { useMoralis } from "react-moralis";
import NativeBalance from "./NativeBalance";
import { Card, Tag, Button } from "antd";
import { Input } from "antd";
import { ImageUpload, FolderUpload } from "react-ipfs-uploader";
//import JsonExample from "./JsonExample";
import React, { useState, useEffect } from "react";
import { Center } from "@chakra-ui/react";
import { getExplorer } from "../helpers/networks";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import {
  Tabs,
  Box,
  TabList,
  TabPanels,
  Tab,
  HStack,
  TabPanel,
} from "@chakra-ui/react";
import { ethers, utils } from "ethers";
import dFactory from "../contracts/dFactory.json";
//import ERC20Create from "./ERC20Create";
import sFactory from "../contracts/sFactory.json";
import ERC20Create from "./ERC20Create";
import DutchForm from "./DutchForm";
import ListItem from "./Nfts/ListItem";



const axios = require("axios");
//*
//const fujiRPC = "https://api.avax-test.network/ext/bc/C/rpc";
//const rinkebyRPC = [
//  "https://rinkeby.infura.io/v3/2d0b5fb8723d44b78858bf4a856b1f1f",
//  "https://eth-rinkeby.alchemyapi.io/v2/nQ9Y9H5tBR1uaR0Jv2ubQB2_hML8VTHc",
//];
//const mumbaiRPC = [
//  "https://rpc-mainnet.maticvigil.com/",
//  "https://polygon-mumbai.infura.io/v3/00eecaae285845319b8f09c7354157ef",
//];

function Create() {
  //const [userMetadata, setUserMetadata] = useState();
  //const { user } = useMoralis(0);
  const { authenticate, isAuthenticated,  logout } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  //const { Moralis } = useMoralis();
  //const { chainId } = useMoralis(0x4);
  const [_symbol, setSymbol] = useState("");
  const [_description, setDescription] = useState("");
  const [_name, setNFTName] = useState("");
  const [_editionSize, setEditionSize] = useState("");
  
  const { isWeb3Enabled, enableWeb3,  isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  const [_baseURI, setBaseURI] = useState("");
  const [_royaltyBPS, setRoyaltyBPS] = useState("");
  const [_animationUrl, setAnimationUrl] = useState("");
  const [deployStatus, setDeployStatus] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { TextArea } = Input;
  /////Eth Gas
  //const [ethGasPriceLow, setEthGasPriceLow] = useState();
  //const [ethGasPriceHigh, setEthGasPriceHigh] = useState();
  // returned by contract event
  const [contractAddress, setContractAddress] = useState(
    " Address will display once confirmed. ",
  );

  //const rinkebyChain = 0x4;
  //const avaxChain = 0xa869;
//const  dynamicAddress = "0x7dE784A753a4adb66F92D079E52af59dB07b8C46"; //rinkeby
   
const dynamicAddress = '0xB874254Dc0C9B88ecb9d8d30AFD24979f093FCFd';

  //const sFactoryAddress = "0xeD95f71CBaE69eFDc9366FC3987fC18CE0A4AfBF"; // rinkeby
  const sFactoryAddress = "0xbd7D37E9eCa342119de3808324C76Ab9360bdF1b";
  //const [dynamicAddress, setDynamicAddress] = useState();
  //const mumbaiAddressDynamic = "0x7dE784A753a4adb66F92D079E52af59dB07b8C46";
  //const fujiAddressDynamic = " 0xBb3D452f166201d59eFC363A57fCBb749d704838";
  const [deployInitiate, setDeployInitiate] = useState();

  

  /////////////////////////////////
  //Deploy erc721Dynamic contract
  //////////////////////////////////
  async function setDeployContract() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        dynamicAddress,
        dFactory.abi,
        signer,
      );
      const transaction = await contract.createEdition(
        _baseURI,
        _name,
        _symbol,
        _description,
        _editionSize,
        _royaltyBPS,
      );
      const tx = await provider.getTransaction(transaction.hash);
      if (tx) {
        if (tx.blockNumber) {
          console.log("tx: ");
          console.log(tx);
          return tx;
        }
      }

      setDeployInitiate("Deploying NFT Collection", tx);
      console.log("Deploying NFT Collection.....", tx);
      setDeployStatus(`${getExplorer(chainId)}tx/${transaction.hash}`);
      console.log(`${getExplorer(chainId)}tx/${transaction.hash}`);
      contract.on(
        "CreatedEdition",
        (editionId, creator, editionSize, editionContractAddress, event) => {
          const info = {
            editionId: ethers.utils.formatUnits(editionId, 0),
            creator: creator,
            editionSize: ethers.utils.formatUnits(editionSize, 0),
            editionContractAddress: editionContractAddress,
            data: event,
          };
          console.log(JSON.stringify(info, null, 5));
          setContractAddress(JSON.stringify(editionContractAddress));
          setEditionSize(JSON.stringify(editionSize));
        },
      );
    } else {
      console.log("Contract not found");
    }
  }

  //////////////////////////
  //  Deploy erc721Static  /////
  /////////////////////////////
  async function setDeployStatic() {
    if (!_name) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        sFactoryAddress,
        sFactory.abi,
        signer,
      );
      const transaction = await contract.createEdition(
        _name,
        _symbol,
        _description,
        _animationUrl,
        imageUrl,
        _editionSize,
        _royaltyBPS,
      );
      console.log("Deploying NFT Collection.....");
      await transaction.wait();
    }
  }

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }
  /*
  async function fetchEthGas() {
    let response = await axios.get(
      "https://ethgasstation.info/json/ethgasAPI.json",
    );
    let prices = {
      low: response.data.safeLow / 10,
      medium: response.data.average / 10,
      high: response.data.fast / 10,
    };
    setEthGasPriceLow(prices.low);
    console.log(`Current ETH Gas Prices (in GWEI):`);
    console.log(`Low: ${prices.low} (transaction completes in < 30 minutes)`);
    console.log(
      `Standard: ${prices.medium} (transaction completes in < 5 minutes)`,
    );
    console.log(`Fast: ${prices.high} (transaction completes in < 2 minutes)`);
    setEthGasPriceHigh(prices.high);
    return prices;
  }

 */


  return (
    <Tabs>
      <Center>
        <TabList>
          <HStack spacing="4px">
            <Box  h="23px">
              <Tab className="ipfsTabs">Dynamic </Tab>
            </Box>
            <Box  h="23px">
              <Tab className="ipfsTabs">Static</Tab>
            </Box>
            <Box  h="23px">
              <Tab className="ipfsTabs">ERC20</Tab>
            </Box>
            <Box  h="23px">
              <Tab className="ipfsTabs">Auction</Tab>
            </Box>
            <Box  h="23px">
              <Tab className="ipfsTabs">Market</Tab>
            </Box>
          </HStack>
        </TabList>
      </Center>
      <TabPanels>
        {/* initially mounted */}
        <TabPanel>
          <Center>
          <Card
            title="NFT Contract w/ JSON metadata"
            bodyStyle={{ padding: "1px", fontSize: "12px" }}
            style={{
              width: "100%",
                  maxWidth: "390px",
              padding: "10px",
              borderRadius: "5px",
              fontSize: "12px",
              //borderColor: "orange",
              borderWidth: "0px",
            }}
          >
            <div style={{ paddingTop: "10px", width: "100%" }}>
              <TableContainer>
                <Table variant="simple" size="md">
                  <TableCaption></TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Account</Th>
                      <Th></Th>
                      <Th></Th>
                     
                      <Th style={{ paddingLeft: "20px" }}>Chain Id</Th>
                     
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>
<p>{walletAddress} </p>
                      </Td>
                      <Td></Td>
                      <Td></Td>
                   

                      <Td style={{ paddingLeft: "20px" }}>{chainId} </Td>
                    
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
            <div>
              <p id="dynamicAddress">Implementation:</p>
            </div>{" "}
            <div>{dynamicAddress}</div>
            <div>
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              NFT Collection Name
            </Tag>
            <Input
              className="formInput"
              placeholder="NFT Collection Name"
              onChange={(e) => {
                setNFTName(e.target.value);
              }}
              value={_name}
              style={{
                padding: 5,
                marginBottom: "10px",
                width: "100%",
                maxWidth: "390px",
                color: "black",
                fontSize: 12,
              }}
            />
            </div>
            <div>
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Symbol
            </Tag>
            <Input
              placeholder="Symbol. 3-5 characters. ie. ETH, BTC, LINK"
              className="formInput"
              onChange={(e) => {
                setSymbol(e.target.value);
              }}
              value={_symbol}
              style={{
                padding: 5,
                marginBottom: "10px",
                width: "100%",
                maxWidth: "390px",
                color: "black",
                fontSize: 12,
              }}
            />
            </div>
            <div>
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Edition Size
            </Tag>
            <Input
              className="formInput"
              placeholder="Edition size: number of tokens"
              onChange={(e) => {
                setEditionSize(e.target.value);
              }}
              value={_editionSize}
              style={{
                padding: 5,
                marginBottom: "10px",
                width: "100%",
                maxWidth: "390px",
                color: "black",
                fontSize: 12,
              }}
            />
            </div>
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Royalties
            </Tag>
            <Input
              placeholder="Royalties: set % to earn (DEV: 500=5%"
              className="formInput"
              onChange={(e) => {
                setRoyaltyBPS(e.target.value);
              }}
              value={_royaltyBPS}
              style={{
                padding: 5,
                marginBottom: "10px",
                width: "100%",
                maxWidth: "390px",
                color: "black",
                fontSize: 12,
              }}
            />
            <div>
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Description
            </Tag>
            <TextArea
              placeholder="Description of token project"
              rows={4}
              style={{
                //marginTop: 8,
                width: "100%",
                borderRadius: "10px",
                maxWidth: "390px",
                marginBottom: 8,
                color: "black",
                fontSize: 12,
              }}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={_description}
            />
            </div>
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Metadata
            </Tag>
            Upload folder containing your JSON metadata files.
            <div style={{ textAlign: "right" }}></div>
            <FolderUpload
              setUrl={setBaseURI}
              style={{ width: "100%", marginBottom: 8, fontSize: 12 }}
            />{" "}
            <a href={_baseURI} target="_blank" rel="noopener noreferrer">
              {_baseURI}
            </a>{" "}
            
            <Input
              className="formInput"
              placeholder="Base URI"
              onChange={(e) => {
                setBaseURI(e.target.value);
              }}
              value={_baseURI}
              style={{
                padding: 5,
                marginBottom: "10px",
                width: "100%",
                maxWidth: "390px",
                color: "black",
                fontSize: 12,
              }}
            /> 
            
            <Center>
              <Button
                type="primary" block
                onClick={setDeployContract}
                className="btn-primary"
                style={{
                  fontSize: 12,
                  backgroundColor: "#0d6ef",
                }}
              >
                Deploy
              </Button>
            </Center>
            <Center>
              <div
                style={{
                  padding: "0px",
                  backgroundColor: "#f3fdff",
                  width: "100%",
                  fontSize: "12px",
                  minHeight: "150px",
                  //margin: "5px",
                  border: "2px solid orange",
                }}
              >
                <p id="deployInitiate">{deployInitiate} </p>{" "}
                <p id="deployStatus">{deployStatus} </p>{" "}
                <p id="contractAddress">Contract address:{contractAddress}</p>
              </div>
            </Center>{" "}
            <Card>
              <p style={{ fontSize: "10px", padding: "10px", color: "blue" }}>
                Open 'Account' menu to view your deployed SmartContracts{" "}
              </p>
            </Card>
          </Card>
          </Center>
        </TabPanel>
        <TabPanel>
          <Center>
          <Card
            title="Single Image NFT"
            bodyStyle={{ 
              padding: "1px", 
              fontSize: "12px"
             }}
            style={{
              width: "100%",
              maxWidth: "390px",
              minWidth: "390px",
              padding: "10px",
              borderRadius: "15px",
              fontSize: "12px",
              borderWidth: "0px",}}
          >
                        <div style={{ paddingTop: "10px", width: "100%" }}>
              <TableContainer>
                <Table variant="simple" size="md">
                  <TableCaption></TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Account</Th>
                      <Th></Th>
                      <Th></Th>
                    
                      <Th style={{ paddingLeft: "20px" }}>Chain Id</Th>
                    
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>
<p> {walletAddress} </p>
                      </Td>
                      <Td></Td>
                      <Td></Td>
                    

                      <Td style={{ paddingLeft: "20px" }}>{chainId} </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
            <div>
              <p id="dynamicAddress">Implementation:</p>
            </div>
              <div>{sFactoryAddress}</div>
            <div>
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Collection Name
            </Tag>
            <Input
              className="formInput"
              placeholder="Product or Collection Name"
              onChange={(e) => {
                setNFTName(e.target.value);
              }}
              value={_name}
              style={{
                padding: 5,
                marginBottom: "10px",
                width: "100%",
                maxWidth: "390px",
                color: "black",
                fontSize: 12,
              }}
            />
            </div>
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              NFT Symbol
            </Tag>
            <Input
              placeholder="Symbol. 3-5 characters. ie. ETH, BTC, LINK"
              onChange={(e) => {
                setSymbol(e.target.value);
              }}
              value={_symbol}
              className="formInput"
              style={{
                padding: 5,
                marginBottom: "10px",
                width: "100%",
                maxWidth: "390px",

                color: "black",
                fontSize: 12,
              }}
            />{" "}
            <div>
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Edition Size
            </Tag>
            <Input
              className="formInput"
              placeholder="Edition size: number of tokens"
              onChange={(e) => {
                setEditionSize(e.target.value);
              }}
              value={_editionSize}
              style={{
                padding: 5,
                marginBottom: "10px",
                width: "100%",
                maxWidth: "390px",
                color: "black",
                fontSize: 12,
              }}
            />
            </div>
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Royalties
            </Tag>
            <Input
              className="formInput"
              placeholder="Royalties: set % to earn (DEV: 500=5%) *FIX*"
              onChange={(e) => {
                setRoyaltyBPS(e.target.value);
              }}
              value={_royaltyBPS}
              style={{
                padding: 5,
                marginBottom: "10px",
                width: "100%",
                maxWidth: "390px",
                color: "black",
                fontSize: 12,
              }}
            />{" "}
<div>
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Description
            </Tag>
            <TextArea
              placeholder="Description of token project"
              rows={4}
              style={{
                marginTop: 8,
                width: "100%",
                maxWidth: "390px",
                marginBottom: 8,
                color: "black",
                fontSize: 12,
              }}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={_description}
            />{" "}
            </div>
            
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
            NFT Image
            </Tag>
            <Card
              style={{ padding: "5px", fontSize: "10px" }}
              bodyStyle={{ padding: "5px" }}
            >
              <ImageUpload
                className="formInput"
                setUrl={setImageUrl}
                style={{ width: "100%", fontSize: "12px" }}
              />
              <p style={{ fontSize: "10px" }}>
                {" "}
                <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                  {" "}
                  Image Hash: {imageUrl}
                </a>
              </p>
            </Card>
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              NFT Animation
            </Tag>
            <Card
              bodyStyle={{ padding: "5px" }}
              style={{ padding: "5px" }}
            >
              <ImageUpload
                setUrl={setAnimationUrl}
                bodyStyle={{ fontSize: "12px" }}
                style={{ width: "100%", fontSize: "12px" }}
              />
              <p style={{ fontSize: "10px" }}>
                {" "}
                <a
                  href={_animationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Animation Hash: {_animationUrl}
                </a>
              </p>
            </Card>
            <Center>
              <Button
                type="primary"
                className="btn mb-3 btn-primary"
                onClick={setDeployStatic}
                style={{
                  color: "white",
                  fontSize: 12,
                }}
              >
                Deploy
              </Button>
            </Center>
            <Center>
              <div
                style={{
                  padding: "0px",
                  backgroundColor: "#f3fdff",
                  width: "100%",
                  fontSize: "12px",
                  minHeight: "150px",
                  //margin: "5px",
                  border: "2px solid orange",
                }}
              >
               {/* <p id="deployStatus">{deployStatus} </p> */}
              </div>
            </Center>{" "}
        <Card>
          <p style={{ fontSize: "10px", padding: "10px", color: "blue" }}>
            Open 'Account' menu to view your deployed SmartContracts{" "}
          </p>
        </Card>
          </Card>
          </Center>
        </TabPanel>
        <TabPanel>
<ERC20Create/>
        </TabPanel>
        <TabPanel>
<DutchForm/>
        </TabPanel>
        <TabPanel>
          <ListItem/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Create;
