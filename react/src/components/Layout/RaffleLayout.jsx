import { useHistory } from "react-router-dom";
import { Button, Layout, Modal, Typography } from "antd";
import React, { useState } from "react";
import { Center, WrapItem, Wrap, Box, HStack, VStack } from "@chakra-ui/react";
import BunyRaffle from "components/BunyRaffle/BunyRaffle";
import {
  ReloadOutlined,
  ControlOutlined,
  RollbackOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
//import ListNftTabs from "components/Nfts/ListNftTabs";
import { Link } from "react-router-dom";
import RaffleFactory from "components/BunyRaffle/RaffleFactory";
import BunyRaffleOne from "components/BunyRaffle/BunyRaffleOne";
import BunyRaffleTwo from "components/BunyRaffle/BunyRaffleTwo";
import { AutoCenter } from "antd-mobile";
import AvatarConnect from "./AvatarConnect";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
const { Content } = Layout;
const { Header, Footer } = Layout;

function RaffleLayout() {
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
              backgroundColor: "#feefd0",
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
                        <AutoCenter>
                          <AvatarConnect />
                        </AutoCenter>
                        <p>
                          Buny Raffle. NFT Raffle Collection with one lucky
                          winner!
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
                                footer={null}
                                headerStyle={{
                                  backgroundColor: "black",
                                  color: "white",
                                }}
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
                              />
                              <div
                                onClick={refreshPage}
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
                <Center w="100%" p={0} bg="#feefd0" display="flex">
                  <Box>
                    <Accordion allowToggle>
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              Section 1 title
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <BunyRaffleOne trigger={trigger} />
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              Section 2 title
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <BunyRaffleTwo trigger={trigger} />
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Box>
                </Center>
              </Content>
            </Layout>
          </Content>
        </Center>
      </Layout>
    </Layout>
  );
}

export default RaffleLayout;
