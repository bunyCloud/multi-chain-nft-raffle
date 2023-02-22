import { Typography } from "antd";
import { Center, WrapItem, Wrap } from "@chakra-ui/react";
import RafflePage from "./RafflePage";
import { Button, Layout, Modal } from "antd";
import React, { useState } from "react";
import RaffleFactory from "components/BunyRaffle/RaffleFactory";
import { HStack } from "@chakra-ui/react";
import TestnetNotice from "components/Notification/TestnetNotice";
import {
  ReloadOutlined,
  ControlOutlined,
  RollbackOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Content } = Layout;
const { Header } = Layout;
const { Paragraph } = Typography;

export default function RafflePageLayout() {
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

  function refreshPage() {
    window.location.reload(false);
  }

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
                  <strong> The Buny Project:</strong> NFT Raffle
                </p>
              </Header>

              <Content
                style={{
                  backgroundColor: "white",
                  width: "100%",
                }}
              >
                <Wrap spacing="px" justify="center">
                  <WrapItem>
                    <Center>
                      <TestnetNotice />
                    </Center>
                  </WrapItem>
                </Wrap>
                <Wrap spacing="5px" justify="center">
                  <WrapItem>
                    <Center>
                      <HStack gap="10px" mt={20}>
                        <div style={{ fontSize: "11px" }}>
                          <Button
                            onClick={() => navigate.goBack()}
                            size="small"
                            icon={<RollbackOutlined />}
                          >
                            {" "}
                            Back{" "}
                          </Button>
                        </div>
                        <div style={{ fontSize: "11px" }}>
                          <Button
                            size="small"
                            href="/dashboard"
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
                            Add
                          </Button>

                          <Modal
                            footer={null}
                            headerStyle={{
                              backgroundColor: "white",
                              color: "black",
                            }}
                            bodyStyle={{
                              padding: "5px",
                              backgroundColor: "white",
                              color: "black",
                            }}
                            style={{
                              padding: "5px",
                              top: "5px",
                              backgroundColor: "white",
                              color: "black",
                              border: "2px solid blue",
                              //borderRadius: "5px",
                              width: "100%",
                              maxWidth: "390px",
                            }}
                            //title="Basic Modal"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            <RaffleFactory />
                          </Modal>
                        </div>

                        <div style={{ fontSize: "11px" }}>
                          <Button
                            size="small"
                            onClick={refreshPage}
                            icon={<ReloadOutlined />}
                          >
                            Reload
                          </Button>
                        </div>
                      </HStack>
                    </Center>
                  </WrapItem>
                </Wrap>

                <Center w="auto" bg="#a900ff">
                  <Wrap>
                    <WrapItem>
                      <RafflePage trigger={trigger} refreshPage={refreshPage} />
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
