import { SimpleGrid, Center, Box, HStack } from "@chakra-ui/react";
import React from "react";
import { nftAddress } from "contracts/config/networkAddress";
import { Button, Tooltip } from "antd";
import { ExpandAltOutlined } from "@ant-design/icons";

export default function MarketDescriptionModal3D({
  name,
  description,
  showModal,
  price,
  image,
  buyNft,
  tokenId,
  itemId,
}) {
  return (
    <React.Fragment>
      <div style={{ textAlign: "center", backgroundColor: "#a900ff" }}>
        <Box
          mt="1"
          textAlign={"center"}
          color="white"
          fontSize="12px"
          bg="white"
          w={"100%"}
          maxWidth={"600px"}
        >
          <Center>
            <div>
              <model-viewer
                shadow-intensity="3"
                style={{
                  width: "390px",
                  height: "300px",
                  backgroundColor: "rgb(229 231 235)",
                }}
                camera-controls
                //alt={`3D NFT Model:${name}`}
                poster={image}
                src={image}
                auto-rotate
              ></model-viewer>
            </div>
          </Center>
          <Center>
            <Box
              fontWeight="semibold"
              textAlign={"left"}
              //p={2}
              color="white"
              h={"100%"}
              fontSize="12px"
              w={"100%"}
              minWidth={"390px"}
              lineHeight="tight"
              noOfLines={[1, 2, 3]}
              isTruncated
            >
              <Box
                bg="#a900ff"
                p={5}
                color="white"
                w={"100%"}
                height="auto"
                marginTop="0"
                boxShadow={"outline"}
                overflow="hidden"
                isTruncated
              >
                <p>
                  <h5 style={{ color: "white" }}> {name}</h5>
                </p>
              </Box>

              <HStack bg="#b3e880">
                <Box
                  mt="1"
                  pl={5}
                  p={5}
                  textAlign={"left"}
                  color="black"
                  fontSize="13px"
                >
                  {nftAddress}
                </Box>
                <Box pr={16} color="black" bg="#b3e880">
                  <p>
                    <strong>Token Id:</strong> {tokenId}
                  </p>
                </Box>
              </HStack>

              <Box
                bg="white"
                color="black"
                height="150px"
                overflow="auto"
                p={20}
              >
                {description}
              </Box>
              <Tooltip title="View token page">
                <Button
                  href={`/token/${nftAddress}/${tokenId}`}
                  style={{ marginBottom: "5px" }}
                  type="ghost"
                  block
                >
                  <ExpandAltOutlined style={{ marginRight: "20px" }} /> View
                  Token Page
                </Button>
              </Tooltip>
            </Box>
          </Center>
        </Box>
      </div>
    </React.Fragment>
  );
}
