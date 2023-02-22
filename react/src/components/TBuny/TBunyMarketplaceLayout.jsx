import { useHistory } from "react-router-dom";
import { Button, Layout, Modal, Typography } from "antd";
import React, { useState } from "react";
import { Center, WrapItem, Wrap, Box, HStack } from "@chakra-ui/react";
import TBunyMarketplace from "./TBunyMarketplace";
import {
  ReloadOutlined,
  ControlOutlined,
  RollbackOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
//import ListNftTabs from "components/Nfts/ListNftTabs";
import CreateTBuny from "./CreateTBuny";
import { Link } from "react-router-dom";
const { Content } = Layout;
const { Header } = Layout;

function TBunyMarketplaceLayout() {
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
                  <strong> The Buny Project:</strong> TBuny Cannabis Product
                  Index
                </p>
              </Header>

              <Content
                style={{
                  backgroundColor: "white",
                  width: "100%",
                }}
              >
                <Wrap spacing="10px" justify="center">
                  <WrapItem>
                    <Center p={2}>
                      <Box
                        w={"auto"}
                        bg="black"
                        color="white"
                        p={5}
                        fontSize="12px"
                      >
                        <p>Cannabis Collection Multi-state Directory Index</p>

                        <Center>
                          <HStack gap="10px" mt={20}>
                            <div style={{ fontSize: "11px" }}>
                              <Button
                                onClick={() => navigate.goBack()}
                                size="small"
                                icon={<RollbackOutlined />}
                              >
                                Back
                              </Button>
                            </div>
                            <div style={{ fontSize: "11px" }}>
                              <Button
                                href="/dashboard"
                                size="small"
                                icon={<ControlOutlined />}
                              >
                                Home
                              </Button>
                            </div>
                            <div style={{ fontSize: "11px" }}>
                              <Button
                                size="small"
                                onClick={showModal}
                                icon={<PlusOutlined />}
                              >
                                Add{" "}
                              </Button>

                              <Modal
                                headerStyle={{
                                  borderRadius: "0px",
                                  color: "white",
                                  padding: "0px",
                                }}
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                  border: "2px solid blue",
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
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                                open={isModalOpen}
                                onOk={handleOk}
                                onCancel={handleCancel}
                              >
                                <CreateTBuny />
                              </Modal>
                            </div>

                            <div style={{ fontSize: "11px" }}>
                              <Button
                                size="small"
                                onClick={() =>
                                  setTrigger((trigger) => trigger + 1)
                                }
                                icon={<ReloadOutlined />}
                              >
                                Reload{" "}
                              </Button>
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
                      <TBunyMarketplace trigger={trigger} />
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

export default TBunyMarketplaceLayout;
