import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  FormHelperText,
  Center,
} from "@chakra-ui/react";
import React, { useState } from "react";
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
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import {Button, Tag,  Input, Card } from "antd";
import NativeBalance from "./NativeBalance";
import {ethers} from 'ethers';
import DutchFactory from "../contracts/DutchSwapFactory.json";
import { getExplorer } from "../helpers/networks";



const tokenAddress = [
  {
    label: "WAVAX",
    value: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
  },
  {
    label: "LINK.e",
    value: "0x5947BB275c521040051D82396192181b413227A3",
  },
  {
    label: "USDC.e",
    value: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
  },
  {
    label: "BAT.e",
    value: "0x98443B96EA4b0858FDF3219Cd13e98C7A4690588",
  },
  {
    label: "WBTC.e",
    value: "0x50b7545627a5162F82A992c33b87aDc75187B218",
  }
];




function DutchForm() {

  const [_token, setToken] = useState();
  const [_startDate, setStartDate] = useState();
  const [_endDate, setEndDate] = useState();
  const [_paymentCurrency, setPaymentCurrency] = useState('0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7');
  const [ _minimumPrice, setMinimumPrice] = useState();
  const [ _wallet, setWallet] = useState();
 
  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.avax-test.network/ext/bc/C/rpc",
);
// const dutchAuctionTemplate = "0x2ca5ef3E63c91f5B7b013EE3ECf8EE6371BC5a1c"; //fuji
const dutchFactoryAddress = "0xccAfE370Ba9F5b57b877c8282CC5973095721a1A"; //fuji

const contract = new ethers.Contract(
    dutchFactoryAddress,
    DutchFactory.abi,
    provider,
);


  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  //// Token Address Input
  const { walletAddress, user, chainId } = useMoralisDapp();
  const receiverWallet = walletAddress;
  const [tokenAddress, setTokenAddress] = useState("");
  const handleTokenAddressChange = (e) => setTokenAddress(e.target.value);
  const isTokenAddressError =
    tokenAddress === "Please fill out all input fields to continue";

  //// Payment Token Address Input
  const handlePaymentCurrencyChange = (e) => setPaymentCurrency(e.target.value);
  const isPaymentError =
    _paymentCurrency === "Please fill out all input fields to continue";

  //// Start Time

  //// End Time

  //// Start Price
  const [_startPrice, setStartPrice] = useState("");
  const handleStartPriceChange = (e) => setStartPrice(e.target.value);
  const isStartPriceError =
    _startPrice === "Please fill out all input fields to continue";

  //// End Price
  const [endPrice, setEndPrice] = useState("");
  const handleEndPriceChange = (e) => setEndPrice(e.target.value);
  const isEndPriceError =
    endPrice === "Please fill out all input fields to continue";

  //// Recipient Address
 // const [receiverWallet, setReceiverWallet] = useState("");
  //onst handleWalletChange = (e) => setReceiverWallet(e.target.value);
  //const isWalletError =
   // receiverWallet === "Please fill out all input fields to continue";

  //// Token Supply
  const [_tokenSupply, setTokenSupply] = useState("");
  const handleTokenSupplyChange = (e) => setTokenSupply(e.target.value);
  const isTokenSupplyError =
    _tokenSupply === "Please fill out all input fields to continue";
  /////////////////////////////////
  //Deploy erc721Dynamic contract
  //////////////////////////////////
  const [ deployStatus, setDeployStatus] = useState();
  const [ deployInitiate, setDeployInitiate] = useState();

  async function DeployContract() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        dutchFactoryAddress,
        DutchFactory.abi,
        signer,
      );
      const transaction = await contract.deployDutchAuction(
        _token,
        _tokenSupply,
        _startDate,
        _endDate,
        _paymentCurrency,
        _startPrice,
        _minimumPrice,
        _wallet,
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
      
    } else {
      console.log("Contract not found");
    }
  }


  return (
    <>
    <Center>
      <Card
        title="Deploy Duction Auction"
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
        <div style={{ paddingTop: "10px", width: "100%" }}>
          <TableContainer>
            <Table variant="simple" size="md">
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
                    {" "}
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
      {/*

      <div>
        <FormControl isInvalid={isAddressError}>
          <FormLabel>Token Addresss</FormLabel>
          <Input
            type="address"
            value={tokenAddress}
            onChange={handleTokenAddressChange}
          />
          {!isAddressError ? (
            <FormHelperText>NFT address being listed for sale.</FormHelperText>
          ) : (
            <FormErrorMessage>
              Error: Token address is required.
            </FormErrorMessage>
          )}
        </FormControl>
      </div>
          */}

      <div>
        <FormControl isInvalid={isTokenAddressError}>
        <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              (NFT) Address 
            </Tag>
          <FormLabel>Token Address</FormLabel>
          <Input
            type="address"
            className="formInput"

            value={_token}
            onChange={handleTokenAddressChange}
          />
          {!isTokenAddressError ? (
            <FormHelperText>
            </FormHelperText>
          ) : (
            <FormErrorMessage>
              Payment Token address is required.
            </FormErrorMessage>
          )}
        </FormControl>
      </div>
     
      <div>
        <FormControl isInvalid={isPaymentError}>
          <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Payment Currency
            </Tag>
           <p id='_paymentCurrency'>BUNY ERC20: {_paymentCurrency}</p> {/*
          <Input
            type="address"
            value={_paymentCurrency}
            className="formInput"

            onChange={handlePaymentCurrencyChange}
          />*/}
       
       
        </FormControl>
      </div>
      <div>
        <FormControl isInvalid={isTokenSupplyError}>
        <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Token Supply
            </Tag>
          <NumberInput
            max={500000}
            min={1}
            className="formInput"

            value={_tokenSupply}
            onChange={handleTokenSupplyChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
    
        </FormControl>
      </div>
      <div>
        <FormControl isInvalid={isStartPriceError}>
        <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
              Start Price
            </Tag>
          <NumberInput
            max={5000000000000000000000000}
            min={1}
            
            value={_startPrice}
            onChange={handleStartPriceChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {!isStartPriceError ? (
            <FormHelperText>*DEV- Add WEI > ETHER conversion</FormHelperText>
          ) : (
            <FormErrorMessage>Starting price is required.</FormErrorMessage>
          )}
        </FormControl>
      </div>
      <div>
        <FormControl isInvalid={isEndPriceError}>
        <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
End Price            </Tag>
          <NumberInput
            max={5000000000000000000000000}
            min={0}
            value={endPrice}
            onChange={handleEndPriceChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {!isEndPriceError ? (
            <FormHelperText>Minimum price</FormHelperText>
          ) : (
            <FormErrorMessage>
              End price or minimum price is required.
            </FormErrorMessage>
          )}
        </FormControl>
      </div>
      <div>
        <FormControl>
        <Tag color="#108ee9" style={{ borderRadius: "2px" }}>
Wallet  </Tag>
       {/*               <Input
            type="wallet"
            value={receiverWallet}
            onChange={handleWalletChange}
          />*/}
          <p id='receiverWallet'>Auction Payment Recipient {receiverWallet}</p>
        </FormControl>
        </div>
        <Center>
        
        <Card
        style={{width:'100%'}}>
              <Button
                type="primary"
                onClick={DeployContract}
                className="btn-primary"
                style={{
                  fontSize: 12,
                  backgroundColor: "#0d6ef",
                }}
              >
                Deploy
              </Button>
          <p style={{ fontSize: "10px", padding: "10px", color: "blue" }}>
            Open 'Account' menu to view your deployed SmartContracts{" "}
          </p>
        </Card>        
        </Center>
        

        </Card>
        </Center>
        
    </>
  );
}

export default DutchForm;
