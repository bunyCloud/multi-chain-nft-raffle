import { SimpleGrid, Center, Box, HStack } from "@chakra-ui/react";
import React from "react";
import { TBunyNftAddress } from "contracts/config/networkAddress";
import { Button, Tooltip } from "antd";
import { ExpandAltOutlined } from "@ant-design/icons";

export default function DescriptionModal({
  name,
  description,
  showModal,
  price,
  image,
  animation_url,
  buyNft,
  tokenId,
  itemId,
}) {
  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>
        <Box
          mt="1"
          textAlign={"center"}
          color="white"
          fontSize="12px"
          bg={"rgb(229 231 235)"}
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
                src={animation_url}
                auto-rotate
              ></model-viewer>
            </div>
          </Center>
          <Center>
            <Box
              fontWeight="semibold"
              textAlign={"left"}
              //p={2}
              color="black"
              h={"100%"}
              fontSize="12px"
              w={"100%"}
              minWidth={"390px"}
              lineHeight="tight"
              noOfLines={[1, 2, 3]}
              isTruncated
            >
              <Box
                bg="white"
                p={5}
                w={"100%"}
                height="25px"
                marginTop="0"
                boxShadow={"outline"}
                overflow="hidden"
                isTruncated
              >
                <p>
                  <h6> {name}</h6>
                </p>
              </Box>

              <HStack bg="white">
                <Box
                  mt="1"
                  pl={5}
                  p={5}
                  textAlign={"left"}
                  color="black"
                  bg="white"
                  fontSize="13px"
                >
                  {TBunyNftAddress}
                </Box>
                <Box pr={16} color="black">
                  <p>
                    <strong>Token Id:</strong> {tokenId}
                  </p>
                </Box>
                <Tooltip title="View token page">
                  <Button
                    href={`/token/${TBunyNftAddress}/${tokenId}`}
                    style={{ marginBottom: "5px" }}
                    type="ghost"
                  >
                    <ExpandAltOutlined />
                  </Button>
                </Tooltip>
              </HStack>

              <Box
                bg="rgb(229 231 235)"
                color="black"
                height="100px"
                overflow="auto"
                p={20}
              >
                {description}
              </Box>
            </Box>
          </Center>
        </Box>
      </div>
    </React.Fragment>
  );
}
