import NFTAbi from "../../contracts/NFT.json";
import NFTMarketplaceAbi from "../../contracts/Marketplace.json";
import axios from "axios";
import Web3Modal from "web3modal";
import { AutoCenter } from "antd-mobile";
import { NavLink, Link } from "react-router-dom";
import { ethers } from "ethers";
import { abi } from "contracts/TheBunyProjectMarketplace.json";
import {
  nftAddress,
  nftMarketplaceAddress,
  HashBoxFactoryAddress,
} from "contracts/config/networkAddress.jsx";
import { Flex, Stack, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { Layout, Tag, Button } from "antd";
import React, { useState, useEffect } from "react";
import { Box, Center } from "@chakra-ui/react";
import { formatEther } from "@ethersproject/units";
import { useEtherBalance, useEthers } from "@usedapp/core";
import MyItems from "components/Nfts/MyItems";
import { Menu, theme } from "antd";
import MyPurchasesLayout from "./MyPurchasesLayout";
import HomepageTabBar from "components/Layout/HomepageTabBar";

const { Sider } = Layout;
const { Content, Footer } = Layout;
const { Header } = Layout;

const styles = {
  layout: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "center",
    justifyContent: "center",
    //margin: "10px auto",
    width: "100%",
    backgroundColor: "black",
  },
};

function DashboardLayout() {
  const [myPublicKey, setMyPublicKey] = useState(null);
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const userBalance = useEtherBalance(account);
  const [loading, setLoading] = useState(false);

  // Save the contents of abi in a variable
  const contractABI = abi;
  let provider;
  let signer;

  //const formatBalance =
  return (
    <>
      <Layout style={{}}>
        <Center>
          <Content
            style={{
              height: "100vh",
              backgroundColor: "black",
            }}
          >
            <Layout>
              <Header style={{ backgroundColor: "black" }}>
                <p
                  style={{
                    fontSize: "14px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <strong>The Buny Project:</strong>User Dashboard
                </p>
              </Header>

              <Center>
                <Content
                  style={{
                    backgroundColor: "#a900ff",
                    color: "blue",
                    fontSize: "13px",
                    padding: "5px",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <Center>
                    <Flex>
                      <Wrap justify="center">
                        <WrapItem justify={"center"}>
                          <Box bg="#b3e880" border="2px solid white">
                            <Box color="white" p={5} mt={20}>
                              <AutoCenter>
                                <HomepageTabBar />
                              </AutoCenter>
                            </Box>
                            {/*
                            <Box bg="#a900ff" p={10} mt={10}>
                              <AutoCenter>
                                <Link
                                  style={{ color: "white" }}
                                  to="/create-market-nft"
                                >
                                  <Button
                                    type="outlined"
                                    block
                                    style={{
                                      width: "320px",
                                      border: "2px solid white",
                                      height: "50px",
                                      backgroundColor: "#f9836e",
                                      color: "white",
                                    }}
                                  >
                                    Mint & Create NFT Market Listing
                                  </Button>
                                </Link>
                              </AutoCenter>
                            </Box>

                            <Box bg="#a900ff" color="#45A29E" p={10} mt={10}>
                              <AutoCenter>
                                <Link
                                  style={{ color: "white" }}
                                  to={"/create-collection"}
                                >
                                  <Button
                                    type="outlined"
                                    block
                                    style={{
                                      width: "320px",
                                      height: "50px",
                                      border: "2px solid white",
                                      backgroundColor: "#f9836e",
                                      color: "white",
                                    }}
                                  >
                                    Create Avalance NFT Collection
                                  </Button>
                                </Link>
                              </AutoCenter>
                            </Box>
                            */}
                          </Box>
                        </WrapItem>
                      </Wrap>
                    </Flex>
                  </Center>
                </Content>
              </Center>
            </Layout>
          </Content>
        </Center>
      </Layout>
    </>
  );
}

export default DashboardLayout;
