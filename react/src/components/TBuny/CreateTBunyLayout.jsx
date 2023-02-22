import { Layout } from "antd";
import React from "react";
import { Center } from "@chakra-ui/react";
import CreateTBuny from "./CreateTBuny";

const { Content, Header } = Layout;

const CreateTBunyLayout = () => (
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
            <Header style={{ backgroundColor: "black" }}>
              <p
                style={{
                  fontSize: "14px",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <strong>The Buny Project:</strong> Create NFT
              </p>
            </Header>

            <Content
              style={{
                backgroundColor: "black",
                color: "white",
                width: "100%",
              }}
            >
              <Center>
                <CreateTBuny />
              </Center>
            </Content>
          </Layout>
        </Content>
      </Center>
    </Layout>
  </Layout>
);

export default CreateTBunyLayout;
