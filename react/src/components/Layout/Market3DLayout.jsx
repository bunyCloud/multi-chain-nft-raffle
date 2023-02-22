import { useHistory } from "react-router-dom";
import { Button, Layout, Modal, Typography } from "antd";
import React, { useState } from "react";
import { Center, WrapItem, Wrap, Box, HStack } from "@chakra-ui/react";
import All3DNfts from "components/Nfts/All3DNfts";
import {
  ReloadOutlined,
  ControlOutlined,
  RollbackOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
//import ListNftTabs from "components/Nfts/ListNftTabs";
import ListNftForm from "./../Nfts/ListNftForm";
import { Link } from "react-router-dom";
const { Content } = Layout;
const { Header } = Layout;

function Market3DLayout() {
  const [trigger, setTrigger] = useState(0);
  const navigate = useHistory();
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

  return (
    <Layout>
      <Layout>
        <Center>
          <Content
            style={{
              marginTop: "0px",
              minHeight: "800px",
              backgroundColor: "black",
            }}
          >
            <Layout>
              <Header
                style={{
                  backgroundColor: "black",
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <p style={{ fontSize: "14px", color: "white" }}>
                  <strong> The Buny Project:</strong> NFT Marketplace
                </p>
              </Header>

              <Content
                style={{
                  backgroundColor: "#a900ff",
                  width: "100%",
                }}
              >
                <Wrap spacing="10px" justify="center">
                  <WrapItem>
                    <Center p={2}>
                      <Box
                        w={375}
                        bg="black"
                        color="white"
                        p={20}
                        fontSize="12px"
                      >
                        <p>
                          3D Models are hosted om IPFS (Interplanetary File
                          Server) for permanent decentralized hosting.
                        </p>
                        <p>
                          {" "}
                          Apologies for users experiencing slow loading speeds.
                        </p>
                        <Center>
                          <HStack gap="40px" mt={20}>
                            <div style={{ fontSize: "11px" }}>
                              <Button
                                onClick={() => navigate.goBack()}
                                size="small"
                                icon={<RollbackOutlined />}
                              />
                              <Link>
                                <p>Back</p>
                              </Link>
                            </div>
                            <div style={{ fontSize: "11px" }}>
                              <Link to="/dashboard">
                                <Button
                                  size="small"
                                  icon={<ControlOutlined />}
                                />
                                <p>Home</p>
                              </Link>
                            </div>
                            <div style={{ fontSize: "11px" }}>
                              <Button
                                size="small"
                                onClick={showModal}
                                icon={<PlusOutlined />}
                              />

                              <div
                                onClick={showModal}
                                style={{ textAlign: "center" }}
                              >
                                <Link>Add</Link>
                              </div>
                              <Modal
                                headerStyle={{
                                  borderRadius: "0px",
                                  color: "white",
                                  padding: "0px",
                                }}
                                style={{
                                  backgroundColor: "#a900ff",
                                  color: "white",
                                  border: "4px solid #b3e880",
                                  padding: "2px",
                                  width: "100%",
                                  maxWidth: "390px",
                                }}
                                closable={"true"}
                                centered
                                closeIcon={
                                  <CloseOutlined style={{ color: "white" }} />
                                }
                                footer={null}
                                bodyStyle={{
                                  padding: "2px",
                                  backgroundColor: "#a900ff",
                                  color: "white",
                                }}
                                open={isModalOpen}
                                onOk={handleOk}
                                onCancel={handleCancel}
                              >
                                <ListNftForm />
                              </Modal>
                            </div>

                            <div style={{ fontSize: "11px" }}>
                              <Button
                                size="small"
                                onClick={() =>
                                  setTrigger((trigger) => trigger + 1)
                                }
                                icon={<ReloadOutlined />}
                              />
                              <div
                                onClick={() =>
                                  setTrigger((trigger) => trigger + 1)
                                }
                                style={{ textAlign: "center" }}
                              >
                                <Link>Reload</Link>
                              </div>
                            </div>
                          </HStack>
                        </Center>
                      </Box>
                    </Center>
                  </WrapItem>
                </Wrap>
                <Center w="100%" p={0} bg="black">
                  <Wrap>
                    <WrapItem>
                      <All3DNfts trigger={trigger} />
                    </WrapItem>
                  </Wrap>
                </Center>
              </Content>
            </Layout>
          </Content>
        </Center>
      </Layout>
    </Layout>
  );
}

export default Market3DLayout;
