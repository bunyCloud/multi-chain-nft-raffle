import { Layout } from "antd";
import React from "react";
import { Box, Link, Center, HStack } from "@chakra-ui/react";
import { Typography } from "antd";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { ControlOutlined, RollbackOutlined } from "@ant-design/icons";

import IpfsTabBar from "components/Ipfs/IpfsTabBar";

const { Content, Header, Sider } = Layout;

const { Paragraph } = Typography;

function IpfsLayout() {
  const navigate = useHistory();

  return (
    <Layout>
      <Layout>
        <Center>
          <Content
            style={{
              marginTop: "0px",
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
                  <strong>The Buny Project:</strong> IPFS
                </p>
              </Header>

              <Content
                style={{
                  backgroundColor: "#c2dde6",
                  color: "white",
                  width: "100%",
                }}
              >
                <Center p={2} bg="#fa625f">
                  <Box w={390} color="black" p={10} fontSize="12px">
                    <p>
                      IPFS (Interplanetary File Server) for permanent
                      decentralized hosting.
                    </p>

                    <Center>
                      <HStack gap="40px" mt={5}>
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
                          <Button
                            size="small"
                            href="/dashboard"
                            icon={<ControlOutlined />}
                          />
                          <Link to="/dashboard">
                            <p>Home</p>
                          </Link>
                        </div>
                      </HStack>
                    </Center>
                  </Box>
                </Center>

                <Center bg="#431c5d" m={50}>
                  <IpfsTabBar />
                </Center>
              </Content>
            </Layout>
          </Content>
        </Center>
      </Layout>
    </Layout>
  );
}
export default IpfsLayout;
