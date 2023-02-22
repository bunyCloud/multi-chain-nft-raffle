import { NavLink, Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, Layout } from "antd";
import {
  nftAddress,
  avatarAddress,
  TBunyNftAddress,
} from "contracts/config/networkAddress.jsx";
import AccountDrawer from "components/AccountDrawer";
import CreateLayout from "components/Layout/CreateLayout";
import FooterMenu from "components/Layout/FooterMenu";
import DashboardLayout from "components/Layout/DashboardLayout";
import IpfsLayout from "components/Layout/IpfsLayout";
import ContractLoaderLayout from "components/Layout/ContractLoaderLayout";
import CreateMarketNFTLayout from "components/Layout/CreateMarketNFTLayout";
import Market3DLayout from "components/Layout/Market3DLayout";
import ProductPageLayoutA from "components/Layout/ProductPageLayoutA";
import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { AutoCenter } from "antd-mobile";
import RafflePageLayout from "components/Layout/RafflePageLayout";
import AvatarCards from "components/Avatar/AvatarCards";
import AvatarPageLayout from "components/Layout/AvatarPageLayout";
import CollectionDirectoryLayout from "components/Layout/CollectionDirectoryLayout";
import AvatarCollectionLayout from "components/Layout/AvatarCollectionLayout";
import CollectionPageLayout from "./components/Layout/CollectionPageLayout";
import HelpLayout from "components/Layout/HelpLayout";
import HomepageTabBar from "components/Layout/HomepageTabBar";
import NftPuller from "utils/nftpuller";
import MyListingsLayout from "./components/Layout/MyListingsLayout";
import MySoldListingsLayout from "components/Layout/MySoldListingsLayout";
import MyPurchasesLayout from "components/Layout/MyPurchasesLayout";
import MyHashBoxLayout from "components/Layout/MyHashBoxLayout";
import { ethers } from "ethers";
import RaffleDirectoryLayout from "./components/Layout/RaffleDirectoryLayout";
import CreateTBunyLayout from "components/TBuny/CreateTBunyLayout";
import TBunyMarketplaceLayout from "components/TBuny/TBunyMarketplaceLayout";
import TBunyPageLayout from "components/TBuny/TBunyPageLayout";

const { Header } = Layout;
const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    backgroundColor: "black",
    marginTop: "30px",
  },
  header: {
    position: "fixed",
    zIndex: 2,
    width: "100%",
    background: "transparent",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    //borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "2px 2px",
    marginTop: "-3px",
  },
  headerRight: {
    display: "flex",
    padding: "25px",
    marginRight: "1px",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: "600",
  },
};
const App = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.avax.network/ext/bc/C/rpc",
  );

  return (
    <Layout style={{ overflow: "auto", backgroundColor: "black" }}>
      <Router>
        <Header style={styles.header}>
          <div
            style={{
              display: "flex",
            }}
          >
            <NavLink to="/">
              <model-viewer
                camera-orbit="calc(0rad + env(window-scroll-y) * 4rad)"
                style={{
                  width: "60px",
                  height: "60px",
                  marginLeft: "5px",
                  marginTop: "15px",
                  backgroundColor: "transparent",
                }}
                src={
                  "https://ipfs.io/ipfs/QmXLxRtVQYKDSJD9bGhAmnbtgT465yN5D52KqWDtYLns9R"
                }
              ></model-viewer>
            </NavLink>
          </div>

          <div style={styles.headerRight}>
            <AccountDrawer />
          </div>
        </Header>
        <div style={styles.content}>
          <Switch>
            <Route path="/buny-raffle">
              <RaffleDirectoryLayout />
            </Route>
            <Route path="/player">
              <p>players</p>
            </Route>

            <Route path="/contract-loader">
              <ContractLoaderLayout />
            </Route>
            <Route path="/TheBunyProject">
              <Center>
                <Box
                  width={"100%"}
                  maxWidth={800}
                  minWidth={300}
                  bg="black"
                  color="white"
                  p={5}
                  height={"100vh"}
                  m={5}
                  mt={50}
                >
                  <h6 style={{ color: "white" }}>The Buny Project</h6>
                  <Box
                    m={10}
                    p={5}
                    bg={"white"}
                    color="black"
                    fontSize={"12px"}
                  >
                    <HStack>
                      <strong>Name:</strong>
                      <div>
                        <p>The Buny Project</p>
                      </div>
                    </HStack>

                    <HStack>
                      <strong>URL:</strong>
                      <div>
                        <p>https://buny.cloud</p>
                      </div>
                    </HStack>

                    <HStack>
                      <strong>Email:</strong>
                      <div>
                        <p>admin@buny.cloud</p>
                      </div>
                    </HStack>
                  </Box>
                  <h6 style={{ color: "white" }}>What is the goal?</h6>
                  <Box
                    m={10}
                    p={10}
                    bg={"white"}
                    color="black"
                    fontSize={"12px"}
                  >
                    <Text>
                      The goal of The Buny Project is to build a fully
                      decentralized, self sustaining, permanent, public
                      SmartContract service utility.
                    
                    </Text>
                    <Text>
                      The goal of the Buny Project is to build a fully decentralized virtual ecosystem for all relevent smartcontractual agreements in demand. 
                    </Text>
                    <Text>
                      The goal of the Buny Project is to build a fully decentralized, fair, opportuity driven, universal platform for cross-chain, cross-border support.  
                    </Text>
                  </Box>
                  <h6 style={{ color: "white" }}>
                    When is the mainnet launch date?
                  </h6>
                  <Box
                    m={10}
                    p={10}
                    bg={"white"}
                    color="black"
                    fontSize={"12px"}
                  >
                    <p>Forever and always. There is no end and there is no beginning.  </p>
                  </Box>
                </Box>
              </Center>
            </Route>
            <Route path="/nft-marketplace">
              <Market3DLayout />
            </Route>
            <Route path="/tbuny">
              <TBunyMarketplaceLayout />
            </Route>

            <Route path="/hashbox">
              {/*}
              <Center>
                <Box width={390} bg="black" color="white" p={20} m={5} mt={50}>
                  <h6 style={{ color: "white" }}>What is a HashBox</h6>
                  <Box
                    m={10}
                    p={10}
                    bg={"white"}
                    color="black"
                    fontSize={"12px"}
                  >
                    <p>
                      A 'HashBox' is a name used to define a SmartContract
                      specifically designed for the storage of IPFS content
                      identifiers called CIDs.
                    </p>
                  </Box>
                  <h6 style={{ color: "white" }}>Why use a HashBox?</h6>
                  <Box
                    m={10}
                    p={10}
                    bg={"white"}
                    color="black"
                    fontSize={"12px"}
                  >
                    <p></p>
                  </Box>
                  <h6 style={{ color: "white" }}>What is a SmartContract</h6>
                  <Box
                    m={10}
                    p={10}
                    bg={"white"}
                    color="black"
                    fontSize={"12px"}
                  >
                    <p>
                      SmartContracts are self-executing contractual agreements
                      programmed into lines of code that run on a blockchain.
                    </p>
                  </Box>
                  <h6 style={{ color: "white" }}>What is IPFS</h6>
                  <Box
                    m={10}
                    p={10}
                    bg={"white"}
                    color="black"
                    fontSize={"12px"}
                  >
                    <p>
                      IPFS (the InterPlanetary File System) is a peer-to-peer
                      network and protocol designed to make the web faster,
                      safer, and more open.{" "}
                      <a href="https://ipfs.io/" target="_blank">
                        {" "}
                        Learn more about IPFS
                      </a>
                    </p>
                  </Box>
                  <h6 style={{ color: "white" }}>What is a CID</h6>
                  <Box
                    m={10}
                    p={10}
                    bg={"white"}
                    color="black"
                    fontSize={"12px"}
                  >
                    <p>
                      Every file object uploaded to IPFS is given a unique
                      address derived from a hash of the files contents.
                    </p>
                  </Box>
                </Box>
              </Center>
              */}
              <MyHashBoxLayout />
            </Route>
            <Route path="/ipfs">
              <IpfsLayout />
            </Route>
            <Route path="/create-market-nft">
              <CreateMarketNFTLayout />
            </Route>
            <Route path="/create-tbuny">
              <CreateTBunyLayout />
            </Route>
            <Route path="/tbuny">
              <TBunyMarketplaceLayout />
            </Route>
            <Route path="/collection/:contractAddress">
              <CollectionPageLayout provider={provider} />
            </Route>
            <Route path="/create-collection">
              <CreateLayout />
            </Route>
            <Route path="/collections">
              <CollectionDirectoryLayout />
            </Route>
            <Route path={`/token/${nftAddress}/:tokenId`}>
              <ProductPageLayoutA />
            </Route>
            <Route path={`/token/${TBunyNftAddress}/:tokenId`}>
              <TBunyPageLayout />
            </Route>
            <Route path={`/avatar/${avatarAddress}/:tokenId`}>
              <AvatarPageLayout />
            </Route>
            <Route path={"/avatar/"}>
              <AvatarCollectionLayout />
            </Route>
            <Route path={`/raffle/:raffleAddress`}>
              <RafflePageLayout />
            </Route>
            <Route path="/dashboard">
              <DashboardLayout />
            </Route>
            <Route path="/my-listings">
              <MyListingsLayout />
            </Route>
            <Route path="/my-sales">
              <MySoldListingsLayout />
            </Route>
            <Route path="/my-items">
              <MyPurchasesLayout />
            </Route>
            <Route path="/help">
              <div
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  height: "100%",
                  marginTop: "55px",
                  maxWidth: "800px",
                }}
              >
                <HelpLayout />
              </div>
            </Route>

            <Route path="/">
              <VStack>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "black",
                    height: "auto",
                    minHeight: "500px",
                    overflowY: "hidden",
                    marginTop: "15px",
                    maxWidth: "800px",
                  }}
                >
                  <Box>
                    <Box color="white" textAlign="center">
                      <p>Dapp is under active development</p>
                      <p>We appreciate your patience.=)</p>
                    </Box>
                    <Center m={5} p={5}>
                      {/*
                      <VStack>
                        <HStack>
                          <div>
                            <p style={{ color: "white", marginRight: "5px" }}>
                              <strong>Next Avalanche NFT Mint!:</strong>
                            </p>
                          </div>
                          <div>
                            <p style={{ color: "yellow" }}>Buny Avatars</p>
                          </div>
                        </HStack>

                        <div>
                          <Box color="white">
                            Mint live January 20th 17:00 UTC
                          </Box>

                          <Link
                            to={
                              "/collection/0xA4C052C32F182064F12875596CEa1A40c95d4338"
                            }
                          >
                            <Button type="primary" block>
                              View Avatar Collection
                            </Button>
                          </Link>
                          <p style={{ color: "white", fontSize: "10px" }}>
                            * NFT token image preview cards below.
                          </p>
                        </div>
                        <div style={{ marginTop: "180px" }}>
                          <AvatarCards />
                        </div>
                        <div>
                          <p
                            style={{
                              color: "white",
                              marginTop: "150px",
                              fontSize: "10px",
                              marginBottom: "-160px",
                            }}
                          >
                            * Images subject to changes prior to launch date.{" "}
                          </p>
                        </div>
                      </VStack>
                      */}
                    </Center>
                  </Box>
                </div>
              </VStack>
            </Route>
          </Switch>
        </div>
      </Router>
      <FooterMenu />
    </Layout>
  );
};

export default App;
