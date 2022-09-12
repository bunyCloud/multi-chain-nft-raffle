import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import NativeBalance from "./NativeBalance";

//import { useMoralis } from "react-moralis";
import { Card, Tag, Input, Button } from "antd";
import { getExplorer } from "../helpers/networks";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
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
import { Center } from "@chakra-ui/react";
import Erc20Factory from "../contracts/Erc20Factory.json";

function ERC20Create() {
  //const { user, chainId } = useMoralis(0x4);
  const { walletAddress, user, chainId } = useMoralisDapp();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("");
  //const [tokenOwner, setTokenOwner] = useState("");
  const [fixedSupply, setTokenSupply] = useState("");
  const ERC20FactoryAddress = "0x7139A4fF66C5D8a268b56AE32d6fd434552b262f";
  const [deployInitiate, setDeployInitiate] = useState();
  const [deployStatus, setDeployStatus] = useState();
  
  //const { TextArea } = Input;

  const tokenOwner = walletAddress;
  console.log (`Connected account:${tokenOwner}`)

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.avax-test.network/ext/bc/C/rpc",
);

  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    ERC20FactoryAddress,
    Erc20Factory.abi,
    signer
  );


  // Fetch minting fee
const [ERC20Fee, setERC20Fee] = useState();

  async function fetchFee() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://api.avax-test.network/ext/bc/C/rpc",
      );
      const contract = new ethers.Contract(
        ERC20FactoryAddress,
        Erc20Factory.abi,
        provider,
      );
      try {
        const data = await contract.minimumFee();
        const price = ethers.utils.formatEther(data.toString());
        console.log(`Listing price: ${price}`);
        setERC20Fee(price);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }


  /////////////////////////////////
  //Deploy erc721Dynamic contract
  //////////////////////////////////

      async function DeployContract() {
        if (typeof window.ethereum !== "undefined") {
          await requestAccount();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            ERC20FactoryAddress,
            Erc20Factory.abi,
            signer,
          );
      const tx = await contract.deployTokenContract(
        symbol,
        name,
        decimals,
        fixedSupply
      );
      setDeployStatus(`${getExplorer(chainId)}tx/${tx.hash}`);
      console.log(`${getExplorer(chainId)}tx/${tx.hash}`);
    } else {
      console.log("Contract not found");
    }
  }

  useEffect(() => {
    fetchFee();
    //fetchSalePrice();
    console.log(`Reading contract ${ERC20Fee}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <Center>
      <Card
        title="Deploy ERC20 Token"
        bodyStyle={{ padding: "1px", fontSize: "12px" }}
        style={{
          width: "100%",
              maxWidth: "390px",
          padding: "10px",
          borderRadius: "15px",
          fontSize: "12px",
          //borderColor: "orange",
          borderWidth: "0px",
        }}
      >
        <p style={{ marginBottom: "10px" }}>Erc20 AVAX Token Deployment</p>
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
                    {walletAddress}
                    
                  </Td>
                  <Td></Td>
                  <Td></Td>
             
                  <Td style={{ paddingLeft: "20px" }}>{chainId} </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <p>Deploy Fee: {ERC20Fee} </p>
        </div>
        <Center>
          <div>
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Token Name
            </Tag>
            <Input
              className="formInput"
              placeholder="ERC20 Token Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              style={{
                padding: 5,
                marginBottom: "10px",
                width: "100%",
                color: "black",
                fontSize: 12,
              }}
            />{" "}
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Symbol
            </Tag>
            <Input
              placeholder="Symbol. 3-5 characters. ie. ETH, BTC, LINK"
              className="formInput"
              onChange={(e) => {
                setSymbol(e.target.value);
              }}
              value={symbol}
              style={{
                padding: 5,
                marginBottom: "10px",
                width: "100%",
                color: "black",
                fontSize: 12,
              }}
            />{" "}
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Decimals
            </Tag>
            <Input
              className="formInput"
              placeholder="Decimal Size typically 18 (1-27)"
              onChange={(e) => {
                setDecimals(e.target.value);
              }}
              value={decimals}
              style={{
                padding: 5,
                marginBottom: "10px",
                width: "100%",
                color: "black",
                fontSize: 12,
              }}
            />{" "}
            <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Token Supply
            </Tag>
            <Input
              placeholder="Token Supply"
              className="formInput"
              onChange={(e) => {
                setTokenSupply(e.target.value);
              }}
              value={fixedSupply}
              style={{
                padding: 5,
                marginBottom: "10px",
                width: "100%",
                color: "black",
                fontSize: 12,
              }}
            />{" "}
          </div>
        </Center>
        <Center>
          <Button onClick={DeployContract}>Deploy</Button>{" "}
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
                <p id="deployStatus">{deployStatus} </p>{" "}
              </div>
            </Center>{" "}
        <Card>
          <p style={{ fontSize: "10px", padding: "10px", color: "blue" }}>
            Open 'Account' menu to view your deployed SmartContracts{" "}
          </p>
        </Card>
      </Card>
      </Center>
    </>
  );
}

export default ERC20Create;
