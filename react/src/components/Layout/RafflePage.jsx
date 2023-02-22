import Web3Modal from "web3modal";
import React, { useState, useEffect } from "react";
import UseAnimations from "react-useanimations";
import alertTriangle from "react-useanimations/lib/alertTriangle";
import loading2 from "react-useanimations/lib/loading2";

import {
  Box,
  Center,
  Grid,
  GridItem,
  //Button,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Flex,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Modal } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ethers, utils } from "ethers";
import raffleNft from "contracts/RaffleNft.json";
import { IconButton } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
import { Tooltip, Badge, notification, Popover, Tag, Card } from "antd";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { HStack, useClipboard } from "@chakra-ui/react";
//import { List, ListItem, ListIcon } from '@chakra-ui/react'
import { CheckIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { Spin } from "antd";
import { Button, List, Avatar } from "antd";

import RandomVDFv1 from "../../contracts/RandomVDFv1.json";
import { Icon, createIcon } from "@chakra-ui/react";
import { NonceManager } from "@ethersproject/experimental";
import { EyeOutlined, TagsOutlined } from "@ant-design/icons";
import PlayerCard from "components/BunyRaffle/PlayerCard";
import { Result } from "antd-mobile";

const CircleIcon = (props) => (
  <>
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  </>
);

function RafflePage() {
  const { raffleAddress } = useParams();
  const { account } = useEthers();
  const [numberCanMint, setNumberCanMint] = useState();
  const [salesPrice, setSalesPrice] = useState();
  const [contractName, setContractName] = useState();
  const [editionSize, setEditionSize] = useState();
  const [description, setDescription] = useState();
  const [raffleOwner, setRaffleOwner] = useState();
  const [contractSymbol, setContractSymbol] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [thisImage, setImage] = useState();
  const [thisAnimation, setAnimation] = useState();
  const [thisPrize, setPrize] = useState();
  const [thisFee, setFee] = useState();
  const [trigger, setTrigger] = useState(0);
  const [loaded, setLoading] = useState();
  const navigate = useHistory();
  const { onCopy, hasCopied } = useClipboard(raffleAddress);
  const [minPlayers, setMinPlayers] = useState();
  const [potential, setPotential] = useState();
  const startRaffle = "true";
  const [allPlayers, setAllPlayers] = useState();
  const [isActive, setIsActive] = useState();
  const [startTime, setStartTime] = useState();
  const [winningNumber, setWinningNumber] = useState();
  const [raffleWinner, setRaffleWinner] = useState();
  const [raffleComplete, setRaffleComplete] = useState("false");
  const [entries, setEntries] = useState([]);
  const [entryCount, setEntryCount] = useState();
  const [thisSeed, setSeed] = useState();
  const [prime, setPrime] = useState();
  const [computeTime, setComputeTime] = useState();
  const [iterations, setIterations] = useState();
  const [newProof, setProof] = useState();
  const [newStart, setStart] = useState();
  const [computeTxLog, setComputeLog] = useState();
  const [supplyLog, setSupplyLog] = useState();

  const bexmod = (base, exponent, modulus) => {
    let result = 1n;
    for (; exponent > 0n; exponent >>= 1n) {
      if (exponent & 1n) {
        result = (result * base) % modulus;
      }
      base = (base * base) % modulus;
    }
    return result;
  };
  const sloth = {
    compute(seed, prime, iterations) {
      const exponent = (prime + 1n) >> 2n;
      let beacon = seed % prime;
      for (let i = 0n; i < iterations; ++i) {
        beacon = bexmod(beacon, exponent, prime);
      }
      return beacon;
    },
    verify(beacon, seed, prime, iterations) {
      for (let i = 0n; i < iterations; ++i) {
        beacon = (beacon * beacon) % prime;
      }
      seed %= prime;
      if (seed == beacon) return true;
      if (prime - seed === beacon) return true;
      return false;
    },
  };

  const content = (
    <>
      <Box maxWidth={250}>
        <div style={{ fontSize: "10px" }}>
          <Text> Raffle: {description} </Text>
          <p>{raffleAddress}</p>
        </div>
        <div style={{ fontSize: "12px", color: "purple", textAlign: "center" }}>
          <p>Price per ticket: {salesPrice} /AVAX</p>
        </div>
      </Box>
    </>
  );

  const approveMinter = (
    <>
      <Box maxWidth={250}>
        <div style={{ fontSize: "10px" }}>{raffleAddress}</div>

        <p
          style={{
            fontSize: "12px",
            color: "purple",
            backgroundColor: "rgb(229 231 235)",
            textAlign: "center",
          }}
        >
          Click to start raffle!
        </p>
      </Box>
    </>
  );
  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.avax-test.network/ext/bc/C/rpc",
  );

  const openNotification = () => {
    notification.open({
      message: "Copied to clipboard",
      description: [
        <>
          <p style={{ fontSize: "10px" }}>
            Buny Raffle address {raffleAddress}
          </p>
        </>,
      ],
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  async function fetchRaffle() {
    setLoading(true);
    const contract = new ethers.Contract(
      raffleAddress,
      raffleNft.abi,
      provider,
    );
    const name = await contract.name(); //contract name
    setContractName(name);
    const symbol = await contract.symbol();
    setContractSymbol(symbol);
    const size = await contract.editionSize();
    setEditionSize(size.toString());
    const avail = await contract.numberCanMint();
    setNumberCanMint(avail.toString());
    const raffle = await contract.houseFee();
    const fee = ethers.utils.formatEther(raffle.toString());
    setFee(Number(fee).toString());
    const prize = await contract.getPrize();
    const avaxPrize = ethers.utils.formatEther(prize.toString());
    setPrize(Number(avaxPrize));
    const image = await contract.imageUrl();
    setImage(image);
    const animation = await contract.animationUrl();
    setAnimation(animation);
    const desc = await contract.description();
    setDescription(desc);
    const startTime = await contract.startTime();
    const date = new Date(startTime * 1000);
    setStartTime(date.toUTCString());
    const isActive = await contract.active();
    setIsActive(Boolean(isActive));
    const mplayers = await contract.minPlayers();
    setMinPlayers(mplayers.toString());
    const supply = await contract.totalSupply();
    setTotalSupply(supply.toString());
    const owner = await contract.owner(); // fetch owner
    setRaffleOwner(owner);
    const weiprice = await contract.salePrice();
    const price = ethers.utils.formatEther(weiprice, "ether");
    setSalesPrice(price);
    const findPotential = ((size * weiprice) / 100) * 80;
    console.log(findPotential.toString());
    const formatIt = ethers.utils.formatEther(findPotential.toString());
    setPotential(formatIt);
    console.log(formatIt);
    const rw = await contract.getWinner();
    setRaffleWinner(rw.toString());
    const winNum = await contract.winningNumber();
    setWinningNumber(winNum.toString());
    if (avail <= 0) {
      setRaffleComplete("true");
      console.log("Raffle tickets sold out!");
    } else {
      console.log(`${avail} Ticket(s) still available`);
      setSupplyLog(`${avail} Ticket(s) still available`);
    }
    setLoading(false);
  }

  async function fetchAllPlayers() {
    const contract = new ethers.Contract(
      raffleAddress,
      raffleNft.abi,
      provider,
    );
    const items = [];
    console.log(items);
    try {
      for (let i = 0; i < count; i++) {
        const items = await contract.getPlayers();
        setAllPlayers(items);
        console.log(items);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const [tx1, setTx1] = useState();

  async function mintToken() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        raffleAddress,
        raffleNft.abi,
        signer,
      );
      const data = await contract.salePrice();
      console.log(data);
      const transaction = await contract.purchase({
        value: data,
      });
      const tx = await provider.getTransaction(transaction.hash);
      if (tx) {
        if (tx.blockNumber) {
          console.log("tx: ");
          console.log(tx);
          return tx;
        }
      }
      setTx1("Starting transaction.....", tx);
      refreshPage();
    }
  }

  function getRawTransaction(tx) {
    function addKey(accum, key) {
      if (tx[key]) {
        accum[key] = tx[key];
      }
      return accum;
    }

    // Extract the relevant parts of the transaction and signature
    const txFields =
      "accessList chainId data gasPrice gasLimit maxFeePerGas maxPriorityFeePerGas nonce to type value".split(
        " ",
      );
    const sigFields = "v r s".split(" ");

    // Seriailze the signed transaction
    const raw = utils.serializeTransaction(
      txFields.reduce(addKey, {}),
      sigFields.reduce(addKey, {}),
    );

    // Double check things went well
    if (utils.keccak256(raw) !== tx.hash) {
      throw new Error("serializing failed!");
    }
    console.log(raw);
    return raw;
  }

  function refreshPage() {
    window.location.reload(false);
  }

  async function approveRaffle() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(raffleAddress, raffleNft.abi, signer);
    const transaction = await contract.setApprovedMinter(
      raffleAddress,
      startRaffle,
    );
    await transaction.wait();
    const startTime = await contract.startTime();
    setStartTime(startTime.toString());
    refreshPage();
  }

  async function pickWinner() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const managedSigner = new NonceManager(signer);
    const contract = new ethers.Contract(
      raffleAddress,
      raffleNft.abi,
      managedSigner,
    );
    const transaction = await contract.pickWinner();
    await transaction.wait();
    const winNum = await contract.winningNumber();
    const rw = await contract.getWinner();
    setRaffleWinner(rw.toString());
    setWinningNumber(winNum.toString());
  }

  useEffect(() => {
    fetchRaffle();
  }, []);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function main() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        raffleAddress,
        raffleNft.abi,
        signer,
      );

      const prime = BigInt((await contract.prime()).toString());
      const iterations = BigInt((await contract.iterations()).toNumber());
      console.log("prime", prime.toString());
      setPrime(prime.toString());
      console.log("iterations", iterations.toString());
      setIterations(iterations.toString());
      // create a new seed
      const tx = await contract.createSeed();
      await tx.wait();
      // get the seed
      const seed = BigInt((await contract.seed(account)).toString());
      console.log("seed", seed.toString());
      setSeed(seed.toString());
      // compute the proof
      //
      const start = Date.now();
      const date = new Date(start * 1000);
      setStart(date.toUTCString());
      //setStart(start.toString())
      const proof = sloth.compute(seed, prime, iterations);
      setProof(proof.toString());
      setComputeTime(Date.now() - start, proof);
      console.log("compute time", Date.now() - start, "ms", "vdf proof", proof);
      const proofTx = await contract.prove(proof);
      await proofTx.wait();
      setComputeLog(proofTx.hash);
      console.log(proofTx.hash);
      pickWinner();
      //
    }
  }

  async function fetchEntries() {
    const contract = new ethers.Contract(
      raffleAddress,
      raffleNft.abi,
      provider,
    );

    const count = await contract.EntryCount();
    setEntryCount(count.toString());
    console.log(count.toString());
    const items = [];
    console.log(items);
    try {
      for (let i = 0; i < count; i++) {
        const items = await contract.readAllEntries();
        setEntries(items);
        console.log(items);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <>
      <Flex>
        <Wrap bg="#a900ff" justify="center">
          <WrapItem justify="center">
            <Center w="100%">
              <VStack>
                <Box
                  style={{
                    backgroundColor: "transparent",
                    //margin: "10px",
                    height: "100%",
                    width: "100%",
                    color: "white",
                  }}
                >
                  {/*
              <Image
                src={thisImage}
                style={{ width: "350px", height: "100%" }}
              ></Image>
              */}
                  <model-viewer
                    shadow-intensity="1"
                    style={{
                      width: "380px",
                      height: "380px",

                      padding: "10px",
                      backgroundColor: "white",
                    }}
                    camera-controls
                    poster={thisImage}
                    //alt={`Nft Name: ${nft.name}`}
                    src={thisAnimation}
                  ></model-viewer>
                </Box>

                <Box
                  fontSize="12px"
                  w="100%"
                  maxWidth={380}
                  h="270px"
                  bg="#b3e880"
                  color="black"
                >
                  <Tag float="left" color="transparent">
                    Description
                  </Tag>

                  <div
                    style={{
                      padding: "10px",
                      color: "black",
                    }}
                  >
                    {description}
                  </div>
                  <Center>
                    {loaded && (
                      <>
                        <UseAnimations animation={loading2} size={56} />
                      </>
                    )}
                  </Center>
                </Box>
              </VStack>
            </Center>
          </WrapItem>
          <WrapItem>
            <Box
              border={"2px solid white"}
              //mt={10}
              bg="#a900ff"
              w={"auto"}
              minWidth="380px"
              maxWidth="390px"
              h={"auto"}
              style={{
                fontSize: "12px",
                color: "white",
              }}
            >
              <Box bg="white">
                <Center bg="#a900ff">
                  <h3 style={{ color: "white" }}>{contractName}</h3>
                </Center>
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
                        fontSize: "11px",
                        padding: "0px",
                        textAlign: "left",
                        color: "black",
                      }}
                    >
                      <strong
                        style={{ paddingRight: "4px", paddingLeft: "4px" }}
                      >
                        Address:
                      </strong>
                      <a
                        href={`https://testnet.snowtrace.io/address/${raffleAddress}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {raffleAddress}
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
                  <div
                    style={{
                      fontSize: "11px",
                      padding: "0px",
                      textAlign: "left",
                      color: "black",
                    }}
                  >
                    <strong style={{ paddingRight: "4px", paddingLeft: "4px" }}>
                      Owner:
                    </strong>
                    <a
                      href={`https://testnet.snowtrace.io/address/${raffleOwner}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {raffleOwner}
                    </a>
                  </div>
                  <Center mt={5} bg="#dede7d">
                    <div
                      style={{
                        fontSize: "11px",
                        padding: "0px",
                        textAlign: "left",
                        color: "black",
                      }}
                    >
                      <HStack gap={6} mb={5}>
                        {" "}
                        <div
                          style={{ paddingRight: "4px", paddingLeft: "4px" }}
                        >
                          Symbol: {contractSymbol}
                        </div>
                        <div
                          style={{ paddingRight: "4px", paddingLeft: "4px" }}
                        >
                          Min. Players: {minPlayers}
                        </div>
                        <div
                          style={{ paddingRight: "4px", paddingLeft: "4px" }}
                        >
                          Ticket: {salesPrice} /AVAX
                        </div>
                      </HStack>
                      <div style={{ paddingRight: "4px", paddingLeft: "4px" }}>
                        {isActive && <>Start Time: {startTime}</>}
                      </div>
                    </div>
                  </Center>
                </Box>
              </Box>
              <VStack bg="white">
                <div>
                  {!raffleWinner && (
                    <>
                      <Box w="100%" bg="white" p={10} mb="-5px">
                        <Center>
                          <VStack>
                            <Center>
                              <Image
                                src="https://ipfs.io/ipfs/QmRL9byDfvaBAXMmkQu3VwuJrH4EwafinURRWNuX2gMqDu"
                                width="75px"
                                alt="Buny 2023 Carrot Award"
                              />
                            </Center>

                            <div
                              style={{
                                fontSize: "16px",
                                color: "hotPink",
                                textAlign: "center",
                                width: "auto",
                              }}
                            >
                              {potential} /avax
                            </div>

                            <div>
                              {!raffleWinner && (
                                <>
                                  <div
                                    style={{
                                      color: "#a900ff",
                                      fontSize: "14px",
                                    }}
                                  >
                                    Tickets Sold: {totalSupply} of {editionSize}
                                  </div>
                                  <div
                                    style={{
                                      color: "#a900ff",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {supplyLog}
                                  </div>
                                </>
                              )}
                            </div>
                            <div>
                              {isActive && startTime && (
                                <>
                                  <Center p={10} mb={33} w="360px">
                                    <Popover
                                      content={content}
                                      title={contractName}
                                    >
                                      <Button
                                        onClick={mintToken}
                                        type="primary"
                                        color="white"
                                        width="100%"
                                        backgroundColor="white"
                                        block
                                      >
                                        <Center>
                                          <HStack>
                                            <div>Buy Ticket</div>
                                            <div> {salesPrice} /AVAX</div>
                                          </HStack>
                                        </Center>
                                      </Button>
                                    </Popover>
                                    <Box>{tx1}</Box>
                                  </Center>
                                </>
                              )}
                            </div>
                          </VStack>
                        </Center>
                      </Box>
                    </>
                  )}
                  <Center>
                    {loaded && (
                      <>
                        <UseAnimations animation={loading2} size={56} />
                      </>
                    )}
                  </Center>
                </div>
                <div>
                  {raffleWinner && (
                    <>
                      <Box
                        fontSize="16px"
                        minWidth={390}
                        maxWidth={400}
                        w="auto"
                        bg="#b3e880"
                        color="#a900ff"
                        p={10}
                        mt={5}
                        mb={5}
                      >
                        <Text>Congratulations Raffle Winner!</Text>
                        <div>
                          <Box w="auto">
                            <Center>
                              <VStack>
                                <div>{raffleWinner && <>{raffleWinner}</>}</div>
                                <div>
                                  {winningNumber && (
                                    <>Ticket #:{winningNumber}</>
                                  )}
                                </div>
                              </VStack>
                            </Center>
                          </Box>
                        </div>
                      </Box>
                    </>
                  )}
                </div>
              </VStack>
              <div>
                {!isActive && !raffleWinner && (
                  <>
                    <Box
                      minWidth={390}
                      maxWidth={380}
                      w="auto"
                      bg="#eda9fc"
                      color="black"
                      p={10}
                    >
                      <Text style={{ padding: "5px" }}>
                        You have arrived!! Welcome to the experimental Avalanche
                        blockchain NFT raffle rabbit hole - "Buny Raffle". We
                        are happy you could make it!{" "}
                      </Text>
                      <Text style={{ padding: "5px" }}>
                        Application is under constant development and
                        improvement. Expect application changes, updates and
                        modification without notice. Bug reporting is greatly
                        appreciated. User accepts full responsibility.{" "}
                      </Text>
                    </Box>
                  </>
                )}
              </div>
              <div>
                {!raffleWinner && !isActive && (
                  <>
                    <Box
                      minWidth={390}
                      maxWidth={400}
                      w="auto"
                      bg="white"
                      color="black"
                      p={10}
                    >
                      <Result title={"Raffle has not started"} />
                      <Center>
                        <HStack>
                          <UseAnimations animation={alertTriangle} size={56} />
                          <Text>
                            <Text>Owner approval required</Text>
                          </Text>
                          <Popover
                            content={approveMinter}
                            title="Set Approved Minter"
                          >
                            <Button
                              type="primary"
                              onClick={approveRaffle}
                              margin={5}
                              size={"xs"}
                              p={4}
                              float="right"
                            >
                              Approve
                            </Button>
                          </Popover>
                        </HStack>
                      </Center>
                    </Box>
                  </>
                )}
              </div>
              <Box bg="white" color="black" p={10} height="auto">
                <Box>
                  <div>
                    {iterations && (
                      <>
                        <Box maxWidth={380} h="50px" wordBreak={"break-all"}>
                          Seed:{thisSeed}
                        </Box>
                        <div>Start: {newStart}</div>
                        <div>Proof: {newProof}</div>
                        <div>Compute time: {computeTime} /ms</div>
                        <div>
                          {computeTxLog && (
                            <>
                              <a
                                target="_blank"
                                href={`https://testnet.snowtrace.io/tx/${computeTxLog}`}
                                rel="noreferrer"
                              >
                                View Transaction on Block Explorer
                              </a>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </Box>

                <div>
                  {isActive && (
                    <>
                      <Box
                        fontSize="12px"
                        w="auto"
                        minWidth={375}
                        maxWidth="390px"
                        h="auto"
                        minHeight={250}
                        bg="#b3e880"
                        color="black"
                      >
                        <Tag float="left" color="transparent">
                          Players
                        </Tag>

                        <Box
                          //   bg="white"
                          //    border={'4px solid rgb(229 231 235)'}
                          mt={-4}
                          p={5}
                          w={"auto"}
                          maxHeight="1100px"
                          overflowX="hidden"
                          overflowWrap="anywhere"
                          style={{
                            fontSize: "10px",
                            padding: "10px",
                            color: "white",
                          }}
                        >
                          <Flex>
                            <VStack>
                              <Center>
                                {" "}
                                <Box display="flex" mt="2" alignItems="center">
                                  <div>
                                    <List
                                      style={{
                                        width: "380px",
                                        fontSize: "10px",
                                      }}
                                      grid={{
                                        gutter: 4,
                                        column: 1,
                                      }}
                                      dataSource={entries}
                                      renderItem={(item) => (
                                        <List.Item key={item.EntryNumber}>
                                          <List.Item.Meta
                                            title={
                                              <>
                                                <HStack gap={2}>
                                                  <div
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    Ticket #:
                                                    {item.EntryNumber.toString()}
                                                  </div>
                                                  <div
                                                    style={{ fontSize: "12px" }}
                                                  >
                                                    {item.player}
                                                  </div>
                                                </HStack>
                                              </>
                                            }
                                          />
                                        </List.Item>
                                      )}
                                    />
                                  </div>
                                </Box>
                              </Center>
                            </VStack>
                          </Flex>
                        </Box>
                      </Box>
                    </>
                  )}
                </div>
              </Box>
            </Box>
          </WrapItem>
          <Button
            width="100%"
            block
            type="link"
            onClick={() => {
              Modal.alert({
                //image: 'https://buny.us-southeast-1.linodeobjects.com/CARROT2.png',
                title: "Disclaimer",
                confirmText: "Confirm",
                content:
                  'THIS SOFTWARE IS PROVIDED "AS IS" AND ANY EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.',
              });
            }}
          >
            Disclaimer
          </Button>
        </Wrap>
      </Flex>
    </>
  );
}

export default RafflePage;
