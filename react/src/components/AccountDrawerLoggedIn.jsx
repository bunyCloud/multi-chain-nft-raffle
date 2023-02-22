import React from "react";
import { Box, Center, Flex, VStack } from "@chakra-ui/react";
import { Layout, Tooltip } from "antd";
import UseDappConnect from "./UseDapp/UseDappConnect";
import { Tabs, Button } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import MyItemsMini from "./Nfts/MyItemsMini";
import {
  FileAddOutlined,
  RightOutlined,
  ShoppingOutlined,
  FundViewOutlined,
  MonitorOutlined,
  UserOutlined,
  UploadOutlined,
  FolderAddOutlined,
  MessageOutlined,
  WalletOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link } from "@chakra-ui/react";
import { Menu } from "antd";

export default function AccountDrawerLoggedIn(props) {
  const { Header, Footer } = Layout;
  const onChange = (key) => {
    console.log(key);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem(<Link href="/dashboard">Dashboard</Link>, "1", <UserOutlined />),
    getItem(
      <Link href="/nft-marketplace">Marketplace</Link>,
      "2",
      <ShoppingOutlined />,
    ),
    getItem(
      <Link href="/create-market-nft">Create NFT Listing</Link>,
      "3",
      <FileAddOutlined />,
    ),
    getItem(
      <Link href="/collections">View Collections</Link>,
      "4",
      <FundViewOutlined />,
    ),
    getItem(
      <Link href="/create-collection">Create NFT Collection</Link>,
      "5",
      <FolderAddOutlined />,
    ),

    getItem(<Link href="/hashbox">IPFS HashBox</Link>, "6", <UploadOutlined />),

    getItem(
      <Link href="/buny-raffle">Buny Raffle</Link>,
      "7",
      <FolderAddOutlined />,
    ),
    getItem(<Link href="/help">Help</Link>, "9", <StarOutlined />),
    getItem(
      <Link href="/TheBunyProject">The Buny Project</Link>,
      "10",
      <MessageOutlined />,
    ),
    getItem(
      <Link href="http://wallet.buny.cloud/" target="_blank">
        Wallet
      </Link>,
      "11",
      <MessageOutlined />,
    ),
  ];

  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <Center marginTop={"2px"} bg={"#1F2937"}>
      <Layout
        style={{
          backgroundColor: "#1F2937",
          width: "390px",
          color: "white",
        }}
      >
        <Header
          style={{
            backgroundColor: "transparent",
            color: "white",
            width: "390px",
          }}
        >
          <Flex>
            <VStack>
              <Box p={5} color="white" w={300}>
                <Tooltip title={"Close Menu"}>
                  <Button
                    size="small"
                    icon={<RightOutlined />}
                    style={{
                      float: "left",
                      marginTop: "6px",
                      marginLeft: "-33px",
                    }}
                    onClick={props.onClose}
                  />
                </Tooltip>
              </Box>
              <Box w={300} p={5} color="white"></Box>
              <Box w={300} color="white">
                <UseDappConnect />
              </Box>
            </VStack>
          </Flex>
        </Header>
        <Footer
          style={{
            marginTop: "0px",
            borderTop: "0px solid white",
            backgroundColor: "transparent",
            position: "absolute",
            left: 0,
            width: "400px",
            fontSize: "12px",
            right: 0,
            bottom: -23,
          }}
        >
          <Tabs
            defaultActiveKey="1"
            centered
            onChange={onChange}
            tabPosition="bottom"
            style={{ color: "white", margin: "0px" }}
            items={[
              {
                label: (
                  <>
                    <VStack>
                      <Center>
                        <AppstoreOutlined />
                        <div style={{ fontSize: "12px" }}>Menu</div>
                      </Center>
                    </VStack>
                  </>
                ),
                key: "1",
                children: (
                  <>
                    <Box bg={"black"} mt={0} mb={0}>
                      <Menu
                        style={{ padding: "0px" }}
                        onClick={onClick}
                        mode="inline"
                        items={items}
                      />
                    </Box>
                  </>
                ),
              },

              {
                label: (
                  <>
                    <VStack>
                      <Center>
                        <WalletOutlined />
                        <div style={{ fontSize: "12px" }}>Wallet</div>
                      </Center>
                    </VStack>
                  </>
                ),
                key: "2",
                children: (
                  <>
                    <Center>
                      <Box
                        bg={"black"}
                        style={{
                          backgroundColor: null,
                          maxHeight: null,
                          overflowY: "visible",
                          overflowX: "hidden",
                          padding: "5px",
                          fontSize: "10px",
                          //height: "100%",
                        }}
                      >
                        <MyItemsMini />
                      </Box>
                    </Center>
                  </>
                ),
              },
              {
                label: (
                  <>
                    <VStack>
                      <Center>
                        <MonitorOutlined />
                        <div style={{ fontSize: "12px" }}>Activity</div>
                      </Center>
                    </VStack>
                  </>
                ),
                key: "3",
                children: (
                  <>
                    <Box bg={"black"} w={390}></Box>
                  </>
                ),
              },
            ]}
          />
        </Footer>
      </Layout>
    </Center>
  );
}
