import React, { useState, useEffect } from "react";
import { raffleFactoryAddress } from "contracts/config/networkAddress";
import {
  Box,
  Flex,
  HStack,
  Image,
  VStack,
  Link,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import raffleFactory from "contracts/raffleFactory.json";
import { useClipboard, Center } from "@chakra-ui/react";
import { ethers } from "ethers";
import { Button, Avatar, List } from "antd";
import {
  TeamOutlined,
  TagsOutlined,
  StarOutlined,
  EyeOutlined,
} from "@ant-design/icons";

export default function RaffleDirectory() {
  const [implementation, setImplementation] = useState();
  const [collectionCount, setCount] = useState();
  const [_name, setName] = useState();
  const [data, setData] = useState([]);
  const [raffles, setRaffles] = useState();
  const { onCopy, value, setValue, hasCopied } = useClipboard(data);
  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.avax-test.network/ext/bc/C/rpc",
  );

  async function fetchRaffles() {
    const contract = new ethers.Contract(
      raffleFactoryAddress,
      raffleFactory.abi,
      provider,
    );
    const implementation = await contract.implementation(); //contract name
    setImplementation(implementation);
    const count = await contract.collectionCount();
    setCount(count.toString());
    console.log(count.toString());
    const items = [];
    console.log(items);
    try {
      for (let i = 0; i < count; i++) {
        const items = await contract.readAllCollections();
        setRaffles(items);
        console.log(items);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchRaffles();
  }, []);

  return (
    <>
      <Flex mt="15px" p={5}>
        <VStack>
          <Center w="100%">
            <Box
              bg="white"
              border={"4px solid #eda9fc"}
              mt={-4}
              p={5}
              isTruncated
              w={"100%"}
              maxWidth={600}
              style={{
                fontSize: "12px",
                padding: "10px",
                color: "#a900ff",
              }}
            >
              <HStack gap="18px" justify="center">
                <div>
                  <strong>Network:</strong>
                </div>
                <img
                  width="20px"
                  src="https://ipfs.io/ipfs/QmYNd5wYSr28rKbC1XwtjNMvPJyZM5rk9WDFZSZEk2n1u6"
                ></img>

                <div>
                  <Button
                    type="link"
                    p={5}
                    color="#a900ff"
                    href={`https://testnet.snowtrace.io/address/${raffleFactoryAddress}`}
                  >
                    View Contract
                  </Button>
                </div>

                <strong>Total # of raffles:</strong>
                <div>{collectionCount}</div>
              </HStack>
            </Box>
          </Center>

          <Box
            // bg="white"
            //    border={'4px solid rgb(229 231 235)'}
            mt={-4}
            m={1}
            p={5}
            w={"auto"}
            minWidth="350px"
            maxHeight="1100px"
            overflow="hidden"
            maxWidth={1000}
            overflowWrap="anywhere"
            style={{
              fontSize: "12px",
              padding: "5px",
              color: "white",
            }}
          >
            <List
              itemLayout="vertical"
              grid={{
                gutter: 6,
                xs: 1,
                sm: 1,
                column: 2,
              }}
              dataSource={raffles}
              renderItem={(item) => (
                <Link href={`/raffle/${item[1]}`}>
                  <List.Item
                    style={{
                      border: "4px solid #b3e880",
                      backgroundColor: "#a900ff",
                      minWidth: "350px",
                      display: "flex",
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Image
                          style={{
                            marginLeft: "20px",
                            width: "50px",
                            height: "50px",
                            marginTop: "10px",
                            marginBottom: "-10px",
                            backgroundColor: "#a900ff",
                          }}
                          size={{
                            //xs: 24,
                            sm: 32,
                            md: 40,
                            lg: 64,
                            xl: 80,
                          }}
                          src={item[6]}
                        />
                      }
                      title={
                        <Button
                          block
                          type="primary"
                          style={{
                            textDecoration: "none",
                            marginTop: "1px",
                            marginBottom: "-10px",
                            //border: "2px solid #f9836e",
                            padding: "1px",
                          }}
                          //type="outlined"
                          href={`/raffle/${item[1]}`}
                        >
                          <HStack justify="center" spacing={8}>
                            <div>{item[0]}</div>
                            <div style={{ marginRight: "-1px" }}>
                              #{item[3].toString()}
                            </div>

                            <Image
                              src="https://buny.us-southeast-1.linodeobjects.com/carrot3.png"
                              width="25px"
                              alt="Carrot"
                            />
                            <div>
                              Win:
                              {((ethers.utils.formatEther(
                                item[5].toString(),
                                "ether",
                              ) *
                                item[2]) /
                                100) *
                                80}{" "}
                              /avax
                            </div>
                          </HStack>
                        </Button>
                      }
                      description={
                        <>
                          <Center color="white" bg="#a900ff" p={5} mb={"-10px"}>
                            <HStack gap="2px">
                              <TagsOutlined fontSize="8px" />
                              <div style={{ fontSize: "11px" }}>
                                Tickets:{item[2].toString()}
                              </div>
                              <TeamOutlined fontSize="8px" />
                              <div style={{ fontSize: "11px" }}>
                                Min Players:{item[4].toString()}
                              </div>
                              <StarOutlined fontSize="8px" />
                              <div style={{ fontSize: "11px" }}>
                                {ethers.utils.formatEther(
                                  item[5].toString(),
                                  "ether",
                                )}{" "}
                                /avax
                              </div>
                            </HStack>
                          </Center>
                        </>
                      }
                    />
                  </List.Item>
                </Link>
              )}
            />
          </Box>
        </VStack>
      </Flex>
    </>
  );
}
