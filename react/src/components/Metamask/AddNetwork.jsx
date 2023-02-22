import React, { useState } from "react";
import { Button } from "antd";
import { nftAddress } from "contracts/config/networkAddress";
import { Center } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, Box, TabPanel } from "@chakra-ui/react";

function AddNetwork() {
  const [chain, setChain] = useState();

  const [log, setLog] = useState();

  const addNetwork = (params) =>
    // eslint-disable-next-line no-undef
    window.ethereum
      .request({ method: "wallet_addEthereumChain", params })
      .then(() => {
        setLog([
          ...log,
          `Switched to ${params[0].chainName} (${parseInt(params[0].chainId)})`,
        ]);
        setChain(parseInt(params[0].chainId));
      })
      .catch((error) => setLog([...log, `Error: ${error.message}`]));

  const addAvalancheTestnet = (params) =>
    addNetwork([
      {
        chainId: "0xa869",
        chainName: "Avalanche Fuji Testnet",
        nativeCurrency: {
          name: "AVAX",
          symbol: "AVAX",
          decimals: 18,
        },
        rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://snowtrace.io"],
      },
    ]);

  const addAvalancheMainnet = (params) =>
    addNetwork([
      {
        chainId: "0xA86A",
        chainName: "Avalanche Mainnet",
        nativeCurrency: {
          name: "AVAX",
          symbol: "AVAX",
          decimals: 18,
        },
        rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
        blockExplorerUrls: ["https://snowtrace.io"],
      },
    ]);

  const addNFT = (params) =>
    window.ethereum
      .request({ method: "wallet_watchAsset", params })
      .then(() => setLog([...log, "Success, NFT added!"]))
      .catch((error) => setLog([...log, `Error: ${error.message}`]));

  const addMarketBuny = (params) =>
    addNFT({
      type: "ERC20",
      options: {
        address: nftAddress,
        symbol: "BUNY",
        decimals: 1,
        image:
          "https://gateway.pinata.cloud/ipfs/QmbAXvTNuz4hvq2SDHMY9zVpXt2Z8AzWknk73a94uwFZCB",
      },
    });

  return (
    <div style={{ padding: "10px", backgroundColor: "black", color: "white" }}>
      <Box>
        <Tabs isLazy>
          <Center>
            <TabList>
              <Tab className="sellerTabs">Network</Tab>
              <Tab className="sellerTabs">Tokens</Tab>
            </TabList>
          </Center>
          <TabPanels>
            {/* initially mounted */}
            <TabPanel>
              <Box>
                <h6 style={{ color: "white" }}>Avalance configuration</h6>

                <p>Add Avalanche network to MetaMask:</p>
                <Center>
                  <div style={{ padding: "5px" }}>
                    <Button
                      style={{ width: "200px", marginBottom: "-5px" }}
                      type="primary"
                      onClick={addAvalancheMainnet}
                    >
                      Add Avalanche Mainnet
                    </Button>
                  </div>
                </Center>
              </Box>
              <Center>
                <div style={{ padding: "5px" }}>
                  <Button
                    style={{ width: "200px", margin: "0px" }}
                    type="primary"
                    onClick={addAvalancheTestnet}
                  >
                    Add Avalanche Testnet
                  </Button>
                </div>
              </Center>
            </TabPanel>
            {/* initially not mounted */}
            <TabPanel>
              <Box>
                <h6>Add tokens to metamask wallet </h6>

                <Box
                  fontWeight="bold"
                  textAlign={"center"}
                  color="blue"
                  h={40}
                  m={5}
                  fontSize="11px"
                  w={"100%"}
                  lineHeight="tight"
                  noOfLines={[1]}
                  isTruncated
                >
                  <strong style={{ color: "white" }}>Marketplace NFT:</strong>{" "}
                  <div>{nftAddress}</div>
                </Box>
                <Center>
                  <Button
                    style={{ width: "200px", marginBottom: "5px" }}
                    type="primary"
                    onClick={addMarketBuny}
                  >
                    Add NFT
                  </Button>
                </Center>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}

export default AddNetwork;
