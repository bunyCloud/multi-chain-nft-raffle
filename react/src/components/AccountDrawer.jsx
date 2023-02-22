import AddNetwork from "components/Metamask/AddNetwork";
import { Button, Drawer } from "antd";
import React, { useState } from "react";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Box, Center } from "@chakra-ui/react";
import { AutoCenter, SafeArea, TabBar } from "antd-mobile";
//import { Box } from "demos";
import { Link } from "@chakra-ui/react";
import { Modal } from "antd";
import {
  AppOutline,
  ShopbagOutline,
  SetOutline,
  ContentOutline,
  UploadOutline,
  UserOutline,
} from "antd-mobile-icons";
import AccountDrawerLayout from "./AccountDrawerLayout";

const AccountDrawer = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Center>
      <Button
        onClick={showDrawer}
        size="med"
        style={{ marginTop: "20px" }}
        icon={<MenuFoldOutlined />}
      ></Button>

      <Drawer
        bodyStyle={{
          //backgroundColor: "#1F2937",
          padding: "5px",
          width: "390px",
          paddingTop: "0px",
          overflowX: "hidden",
          overflowY: "hidden",
        }}
        headerStyle={{
          textAlign: "left",
          color: "black",
          padding: "5px",
          backgroundColor: "white",
          marginBottom: "-5px",
          marginTop: "-3px",
        }}
        title={[
          <>
            <TabBar>
              <TabBar.Item
                key="/home"
                icon={
                  <Link href="https://buny.cloud/">
                    <AppOutline style={{ fontSize: "18px" }} />
                  </Link>
                }
                title={[<Link href="https://buny.cloud/">Home</Link>]}
              />
              <TabBar.Item
                key="/dashboard"
                icon={
                  <Link href="https://buny.cloud/dashboard">
                    <UserOutline style={{ fontSize: "18px" }} />
                  </Link>
                }
                title={[
                  <Link href="https://buny.cloud/dashboard">Dashboard</Link>,
                ]}
              />
              <TabBar.Item
                key="/nft-marketplace"
                icon={
                  <Link href="https://buny.cloud/nft-marketplace">
                    <ShopbagOutline style={{ fontSize: "18px" }} />
                  </Link>
                }
                title={[
                  <Link href="https://buny.cloud/nft-marketplace">
                    Marketplace
                  </Link>,
                ]}
              />
              <TabBar.Item
                key="/create"
                icon={[
                  <Link href="https://buny.cloud/ipfs">
                    <UploadOutline style={{ fontSize: "18px" }} />
                  </Link>,
                ]}
                title={[<Link href="https://buny.cloud/ipfs">HashBox</Link>]}
              />
              <TabBar.Item
                key="/Collections"
                icon={[
                  <Link href="https://buny.cloud/collections">
                    <ContentOutline style={{ fontSize: "18px" }} />
                  </Link>,
                ]}
                title={[
                  <Link href="https://buny.cloud/collections">
                    Collections
                  </Link>,
                ]}
              />

              <TabBar.Item
                key="/settings"
                icon={[
                  <div onClick={showModal}>
                    <SetOutline style={{ fontSize: "18px" }} />
                  </div>,
                ]}
                title={[
                  <Link>
                    <div onClick={showModal}>Settings</div>
                  </Link>,
                ]}
              />
            </TabBar>

            <Modal
              footer={null}
              headerStyle={{ backgroundColor: "black", color: "white" }}
              bodyStyle={{
                padding: "5px",
                backgroundColor: "black",
                color: "white",
              }}
              style={{
                padding: "5px",
                backgroundColor: "black",
                color: "white",
                border: "2px solid blue",
                borderRadius: "10px",
                width: "100%",
                maxWidth: "390px",
              }}
              //title="Basic Modal"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Center>
                <AddNetwork />
              </Center>
            </Modal>
          </>,
        ]}
        placement="right"
        width={390}
        closable={false}
        onClose={onClose}
        open={open}
      >
        <AutoCenter>
          <Box bg="#a900ff" w={390} h={"100vh"}>
            <AccountDrawerLayout onClose={onClose} />
          </Box>
        </AutoCenter>
        <SafeArea position="bottom" />
      </Drawer>
    </Center>
  );
};

export default AccountDrawer;
