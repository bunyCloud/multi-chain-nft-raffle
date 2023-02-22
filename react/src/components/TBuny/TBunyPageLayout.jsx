import { Layout } from "antd";
import React from "react";
import { Center, Box, WrapItem, Wrap } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TBunyPage from "./TBunyPage";
import HeaderNotice from "components/Notification/HeaderNotice";

const { Content } = Layout;
const { Header } = Layout;

const TBunyPageLayout = (props) => (
  <Layout>
    <Layout>
      <Center>
        <Content
          style={{
            marginTop: "0px",
            minHeight: "800px",
            width: "auto",
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
                <strong> The Buny Project:</strong> TBuny Indexed NFT
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
                    <HeaderNotice />
                  </Center>
                </WrapItem>
              </Wrap>
              <Wrap spacing="5px" justify="center">
                <WrapItem>
                  <Center>
                    <Box>
                      <Link to={"/tbuny"}>
                        <ArrowBackIcon />
                        Back
                      </Link>
                    </Box>
                  </Center>
                </WrapItem>
              </Wrap>
              <Center w="100%" p={1} bg="black">
                <Wrap>
                  <WrapItem>
                    <TBunyPage />
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

export default TBunyPageLayout;
