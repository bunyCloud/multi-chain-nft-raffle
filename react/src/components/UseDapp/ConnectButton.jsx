import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";
import { useState } from "react";
import "subcomponents/hoverButton.scss";
import { AutoCenter } from "antd-mobile";

export default function ConnectButton({ handleOpenModal }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  function handleConnectWallet() {
    setIsLoggedIn(false);
    activateBrowserWallet();
    setIsLoggedIn(true);
  }
  return account ? (
    <Box
      display="flex"
      alignItems="center"
      background="transparent"
      borderRadius="xl"
      py="0"
      marginBottom="-20px"
    >
      <Box mb={5} px="3">
        <Text color="white" fontSize="12px">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)}{" "}
          AVAX
        </Text>
      </Box>
      <Button
        onClick={handleOpenModal}
        bg="transparent"
        border="1px solid #a900ff"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "#eda9fc",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        mb={5}
        height="30px"
      >
        <Text color="blaxk" fontSize="12px" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length,
            )}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
    <AutoCenter>
      <div classame="buttons">
        <Button
          bg="transparent"
          onClick={handleConnectWallet}
          w={300}
          /*
      bg="transparent"
      color="orange"
      fontSize="md"
      fontWeight="medium"
      mb={4}
      
      h={35}
      zIndex={1}
      borderRadius="xl"
      border="2px solid orange"
      _hover={{
        borderColor: "yellow",
        color: "white",
      }}
      _active={{
        backgroundColor: "transparent",
        borderColor: "white",
      }}
      */
          className="pulse"
        >
          Connect
        </Button>
      </div>
    </AutoCenter>
  );
}
