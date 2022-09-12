import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
//import OpenSea from "./OpenSea";
import React, { useState } from "react";
import { Card, Button } from "antd";
//import NftCard from "./nftcard";
import { getExplorer } from "../helpers/networks";
//import { fetchNFTs } from "../utils/fetchNFTs";
import { useMoralis } from "react-moralis";

import {
  Table,
  Center,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { Statistic } from "antd";
import erc721Dynamic from "../contracts/erc721Dynamic.json";
import { ethers } from "ethers";
import { Divider, Input } from "antd";

function OwnerLoadContract() {
  //const [withdraw, setWithdraw] = useState("");
  const { chainId } = useMoralis(0x4);

  const [minterAddress, setMinterAddress] = useState("");
  const [_allowed, setAllowed] = useState("");
  const [_NewBaseURI, setNewBaseURI] = useState();
  const [addressTo, setAddressTo] = useState("");

  const [totalSupply, setTotalSupply] = useState("");
  const [salesPrice, setSalesPrice] = useState();
  const [numberCanMint, setNumberCanMint] = useState("");
  const [setBaseURI] = useState("");
  const [_editionSize, setEditionSize] = useState("");
  const [NFTs, setNFTs] = useState("");
  const [_symbol, setSymbol] = useState("");
  const [_description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [_name, setNFTName] = useState("");
  const [contractAddress, setContractAddress] = useState(
    "0xff6f9c17424fda52f1fb8094201f1a4325ccaa05",
  );
  const [owner, setOwner] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchName() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        erc721Dynamic.abi,
        provider,
      );
      try {
        const data = await contract.name();
        console.log("data: ", data);
        setNFTName(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  async function fetchOwner() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        erc721Dynamic.abi,
        provider,
      );
      try {
        const data = await contract.owner();
        console.log("data: ", data);
        setOwner(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  async function fetchSymbol() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        erc721Dynamic.abi,
        provider,
      );
      try {
        const data = await contract.symbol();
        console.log("data: ", data);
        setSymbol(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  async function fetchDescription() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        erc721Dynamic.abi,
        provider,
      );
      try {
        const data = await contract.description();
        console.log("data: ", data);
        setDescription(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  async function fetchBase() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        erc721Dynamic.abi,
        provider,
      );
      try {
        const data = await contract.baseURI();
        setBaseURI(data);
        console.log("data: ", data);
        //setBaseURI(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  async function fetchTotalSupply() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        erc721Dynamic.abi,
        provider,
      );
      try {
        const data = await contract.totalSupply();
        console.log("data: ", data);
        setTotalSupply(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  async function fetchSalePrice() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        erc721Dynamic.abi,
        provider,
      );
      try {
        const data = await contract.salePrice();
        const price = ethers.utils.formatEther(data.toString());
        console.log(`Listing price: ${price}`);
        setSalesPrice(price);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  async function fetchEditionSize() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        erc721Dynamic.abi,
        provider,
      );
      try {
        const data = await contract.editionSize();
        console.log("data: ", data);
        setEditionSize(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  ////////////////////////////////
  // Fetch max mint # per wallet //
  //////////////////////////////////
  async function fetchNumberCanMint() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        erc721Dynamic.abi,
        provider,
      );
      try {
        const data = await contract.numberCanMint();
        console.log("data: ", data);
        setNumberCanMint(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  //////////////////////////////////////////////
  //// Contract Write Functions ///////////////////
  //////////////////////////////////////////////////

  ///////////////////
  //set Base URI  ////
  //////////////////

  async function settingBaseUri() {
    if (!_NewBaseURI) return;

    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        erc721Dynamic.abi,
        signer,
      );
      const transaction = await contract.setBaseURI(_NewBaseURI);
      console.log("Minting NFT to {_NewBaseURI}.....");

      setNewBaseURI("");
      await transaction.wait();
      fetchBase();
    }
  }

  async function definePrice() {
    if (!price) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        erc721Dynamic.abi,
        signer,
      );

      const transaction = await contract.setSalePrice(price);
      await transaction.wait();
      setSalesPrice(price);
      console.log(`NFT price set:  ${price}.....`);
    }
  }
  /////////////////////
  /////mint edition/////
  //////////////////////
  const [mintEditionLog, setMintEditionLog] = useState();
  const [mintEditionHash, setMintEditionHash] = useState();
  async function setMintEdition() {
    if (!addressTo) return;

    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        erc721Dynamic.abi,
        signer,
      );
      const transaction = await contract.mintEdition(addressTo);
      const tx = await provider.getTransaction(transaction.hash);
      if (tx) {
        if (tx.blockNumber) {
          console.log("tx: ");
          console.log(tx);
          return tx;
        }
      }

      setMintEditionLog(`Minting NFT to ${addressTo}`);
      console.log(`Minting NFT to ${addressTo}.....`);
      setMintEditionHash(`${getExplorer(chainId)}tx/${transaction.hash}`);
      console.log(`${getExplorer(chainId)}tx/${transaction.hash}`);
    }
  }
  ///////////////////////////
  //Purchase Tokens
  //////////////needs testing!
  async function purchaseToken() {
    if (!salesPrice) return;

    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        erc721Dynamic.abi,
        signer,
      );
      const transaction = await contract.purchase(salesPrice);
      console.log("Minting NFT...");

      await transaction.wait();
    }
  }

  //Owner withdraw from contract
  //formatEther
  async function Withdraw() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        erc721Dynamic.abi,
        signer,
      );
      const transaction = await contract.withdraw();
      console.log("Minting NFT to {addressTo}.....");

      await transaction.wait();
    }
  }

  ///////////////////////////
  //set Approved Minter
  ///////////////////////////
  const setApprovedMinter = (
    <Center>
      <Button
        type="primary"
        style={{ backgroundColor: "blue", color: "white", fontSize: 12 }}
        onClick={async () => {
          if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
              contractAddress,
              erc721Dynamic.abi,
              signer,
            );
            const transaction = await contract.setApprovedMinter(
              minterAddress,
              _allowed,
            );
            console.log("Setting approved minter address....");
            await transaction.wait();
          }
        }}
      >
        Set Minter
      </Button>
    </Center>
  );

  return (
    <Center>
      <Card
        title="Owner Contract Loader"
        bodyStyle={{ padding: "5px" }}
        style={{
          width: "100%",
maxWidth: "800px",
          minWidth: "390px",
          padding: "1px",
          borderRadius: "15px",
          fontSize: 8,
          //borderColor: "orange",
          borderWidth: "3px",
        }}
      >
        <Text fontSize="11px">
          Already deployed your contract? Load it here.
        </Text>
        <Card
          bodyStyle={{ padding: "5px" }}
          style={{
            width: "100%",
            fontSize: 12,
            padding: "0px",
            margin: "auto",
            color: "black",
            //backgroundColor: "blue",
            borderWidth: "0px",
            //                    borderColor: "orange",
          }}
        >
          <Center>
            <Input
              onChange={(e) => setContractAddress(e.target.value)}
              value={contractAddress}
              placeholder="Enter NFT Contract Address"
              style={{
                border: "1px solid #dfe1e5",
                width: "90%",
                //width: "auto",
                borderRadius: "24px",
                display: "flex",
                height: "44px",

                fontSize: 12,
                color: "black",
              }}
            />
          </Center>
          <Center>
            <Button
              onClick={() => {
                //fetchNFTs(owner, contractAddress, setNFTs);
                fetchOwner();
                fetchSymbol();
                fetchName();
                fetchDescription();
                fetchBase();
                fetchTotalSupply();
                fetchEditionSize();
                fetchNumberCanMint();
                fetchSalePrice();
              }}
              style={{
                //backgroundColor: "",
                padding: "0px 16px",
                cursor: "pointer",
                height: "36px",
                minWidth: "64px",
                fontFamily: "Roboto, arial, sans-serif",
                lineHeight: "27px",
                backgroundColor: "white",
                border: "1px solid silver",
                borderRadius: "14px",
                margin: "5px 2px",
                textAlign: "center",
                color: "black",
              }}
            >
              Load Contract
            </Button>
          </Center>
        </Card>

        <TableContainer>
          <Card
            bodyStyle={{ padding: "5px" }}
            style={{
              width: "100%",
              padding: "2px",

              borderWidth: "3px",
              backgroundColor: "#81cdf2",
            }}
          >
            <Table>
              <Tbody>
                <Tr>
                  <Td>
                    <Text fontSize="12px" color="tomato">
                      Owner:
                    </Text>
                  </Td>
                  <Td></Td>
                  <Td>
                    <Text fontSize="10px" color="black">
                      {owner}
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Text fontSize="12px" color="tomato">
                      Address
                    </Text>
                  </Td>
                  <Td></Td>
                  <Td>
                    <Text fontSize="10px" color="black">
                      {contractAddress}
                    </Text>
                  </Td>
                </Tr>

                <Tr>
                  <Td>
                    <Text fontSize="12px" color="tomato">
                      Collection:
                    </Text>
                  </Td>
                  <Td></Td>
                  <Td>
                    <Text fontSize="10px" color="black">
                      {_name}
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Text fontSize="10px" color="tomato">
                      Symbol:
                    </Text>
                  </Td>
                  <Td></Td>
                  <Td>
                    <Text fontSize="10px" color="black">
                      {_symbol}
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Text fontSize="12px" color="tomato">
                      Description:
                    </Text>
                  </Td>
                  <Td></Td>
                  <Td>
                    <Text fontSize="10px" color="black">
                      {_description}
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Text fontSize="12px" color="tomato">
                      Edition Size:
                    </Text>
                  </Td>
                  <Td></Td>
                  <Td>
                    <Statistic
                      //title="Edition Size"
                      value={_editionSize}
                      valueStyle={{ fontSize: 12, color: "black" }}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Text fontSize="12px" color="tomato">
                      Available:
                    </Text>
                  </Td>
                  <Td></Td>
                  <Td>
                    <Statistic
                      //title="Available "
                      value={numberCanMint}
                      valueStyle={{ fontSize: 12, color: "black" }}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Text fontSize="12px" color="tomato">
                      Total Supply:
                    </Text>
                  </Td>
                  <Td></Td>
                  <Td>
                    <Statistic
                      //title="Total Supply"
                      value={totalSupply}
                      valueStyle={{
                        fontSize: 12,
                        color: "black",
                        //textAlign: "center",
                      }}
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Card>
        </TableContainer>
        <Card
          style={{
            width: "100%",
            borderWidth: "3px",
            //                    borderColor: "#ffb657",
            backgroundColor: "white",
          }}
          bodyStyle={{ padding: "5px" }}
        >
          <Center>
            <Statistic
              title="Sale Price"
              value={salesPrice}
              valueStyle={{ fontSize: 14, color: "black" }}
            />
          </Center>{" "}
        </Card>
        <Center>
          <Card style={{ border: "0px", width: "100%" }}>
            <Tabs isLazy>
              <Center>
                <TabList>
                  <Tab
                    style={{
                      padding: "0px 16px",
                      cursor: "pointer",
                      height: "40px",
                      minWidth: "80px",
                      fontFamily: "Roboto, arial, sans-serif",
                      lineHeight: "27px",
                      backgroundColor: "blue",
                      border: "1px solid silver",
                      borderRadius: "14px",
                      margin: "11px 8px",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Manage
                  </Tab>
                  <Tab
                    onClick={() => {
                      //fetchNFTs(owner, contractAddress, setNFTs);
                    }}
                    style={{
                      padding: "0px 16px",
                      cursor: "pointer",
                      height: "40px",
                      minWidth: "80px",
                      fontFamily: "Roboto, arial, sans-serif",
                      lineHeight: "27px",
                      backgroundColor: "blue",
                      border: "1px solid silver",
                      borderRadius: "14px",
                      margin: "11px 8px",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Minted
                  </Tab>
                  <Tab
                    style={{
                      //backgroundColor: "",
                      padding: "0px 16px",
                      cursor: "pointer",
                      height: "40px",
                      minWidth: "80px",
                      fontFamily: "Roboto, arial, sans-serif",
                      lineHeight: "27px",
                      backgroundColor: "blue",
                      border: "1px solid silver",
                      borderRadius: "14px",
                      margin: "11px 8px",
                      textAlign: "center",
                      color: "white",
                    }}
                    //onClick={fetchNFTs(owner, contractAddress, setNFTs)}
                  >
                    OpenSea
                  </Tab>
                </TabList>
              </Center>
              <TabPanels>
                {/* initially mounted */}
                <TabPanel>
                  <Card
                    title="Owner Mint"
                    style={{
                      fontSize: 12,
                      color: "black",
                      border: "0px",
                      width: "100%",
                      padding: "2px",
                    }}
                  >
                    <Input
                      onChange={(e) => setAddressTo(e.target.value)}
                      value={addressTo}
                      placeholder="Mint to Address"
                      style={{
                        padding: "2px",
                        width: "100%",
                        border: "1px solid blue",
                        fontSize: 12,
                        color: "black",
                      }}
                    />
                    <Center>
                      <Button
                        type="primary"
                        onClick={setMintEdition}
                        style={{
                          fontSize: 12,
                          backgroundColor: "blue",
                          color: "white",
                        }}
                      >
                        Mint Edition
                      </Button>
                    </Center>

                    <Center>
                      <div style={{ fontSize: "10px" }}>
                        <p id="mintEditionLog">{mintEditionLog} </p>
                        <p id="mintEditionHash">{mintEditionHash}</p>
                      </div>
                    </Center>
                  </Card>
                  <Card
                    title="Purchase"
                    style={{
                      width: "100%",
                      padding: "2px",
                      fontSize: 12,
                      color: "black",
                    }}
                  >
                    <Center>
                      <Button
                        type="primary"
                        onClick={purchaseToken}
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          fontSize: 12,
                        }}
                      >
                        Purchase
                      </Button>
                    </Center>
                  </Card>

                  <Card
                    title="Set Minter"
                    style={{
                      fontSize: 12,
                      color: "black",
                      padding: "2px",
                      width: "100%",
                      border: "0px",
                    }}
                  >
                    <Input
                      placeholder="Address"
                      onChange={(e) => {
                        setMinterAddress(e.target.value);
                      }}
                      value={minterAddress}
                      style={{
                        padding: 2,
                        width: "100%",
                        border: "1px solid blue",
                        color: "black",
                        fontSize: 12,
                      }}
                    />{" "}
                    <Divider />
                    <Input
                      placeholder="Approved? (True/False)"
                      onChange={(e) => {
                        setAllowed(e.target.value);
                      }}
                      value={_allowed}
                      style={{
                        padding: "2px",
                        border: "1px solid blue",
                        width: "100%",
                        color: "black",
                        fontSize: 12,
                      }}
                    />{" "}
                    <Divider />
                    {setApprovedMinter}
                  </Card>
                  <Card
                    title="Set Sales Price"
                    style={{ fontSize: 12, color: "black" }}
                  >
                    <Input
                      placeholder="price in wei"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      value={price}
                      style={{
                        padding: "2px",
                        width: "100%",
                        border: "1px solid blue",
                        color: "black",
                        fontSize: 12,
                      }}
                    />{" "}
                    <Divider />
                    <Center>
                      <Button
                        type="primary"
                        onClick={definePrice}
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          fontSize: 12,
                        }}
                      >
                        Set Token Price
                      </Button>
                    </Center>
                  </Card>
                  <Card
                    title="Set Base URI"
                    style={{
                      fontSize: 12,
                      color: "black",
                      padding: "2px",
                      width: "100%",
                      border: "0px",
                    }}
                  >
                    <Input
                      placeholder="set baseURI *add forward / to end of URL"
                      onChange={(e) => {
                        setNewBaseURI(e.target.value);
                      }}
                      value={_NewBaseURI}
                      style={{
                        padding: "2px",
                        width: "100%",
                        color: "black",
                        border: "1px solid blue",
                        marginTop: 10,
                        fontSize: 12,
                      }}
                    />{" "}
                    <Divider />
                    <Center>
                      <Button
                        type="primary"
                        onClick={settingBaseUri}
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          fontSize: 12,
                        }}
                      >
                        Set Base URI
                      </Button>
                    </Center>
                  </Card>

                  <Card
                    title="Withdraw"
                    style={{ fontSize: 12, color: "black" }}
                  >
                    <Center>
                      <Button
                        type="primary"
                        onClick={() => {
                          Withdraw();
                        }}
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          fontSize: 12,
                        }}
                      >
                        Withdraw Funds
                      </Button>
                    </Center>
                  </Card>
                </TabPanel>
                {/* initially not mounted */}
                <TabPanel>
       {/*
                  <section className="flex flex-wrap justify-center">
                    {NFTs ? (
                      NFTs.map((NFT) => {
                        return (
                          <NftCard
                            image={NFT.media[0].gateway}
                            id={NFT.id.tokenId}
                            title={NFT.title}
                            address={NFT.contract.address}
                            description={NFT.description}
                            attributes={NFT.metadata.attributes}
                          ></NftCard>
                        );
                      })
                    ) : (
                      <div>No NFTs found</div>
                    )}
                  </section>
                    */}
                  <Center>
                    <div>
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "blue",
                          padding: "5px 5px 5px",
                          color: "white",
                          fontSize: 12,
                        }}
                        onClick={() => {
                          //fetchNFTs(owner, contractAddress, setNFTs);
                        }}
                      >
                        Refresh
                      </Button>
                    </div>
                  </Center>
                </TabPanel>
                <TabPanel>
                  
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Card>
        </Center>
      </Card>
    </Center>
  );
}

export default OwnerLoadContract;
