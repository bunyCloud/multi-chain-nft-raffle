import { Button, Drawer } from "antd";
import React, { useState } from "react";
//import Chains from "./Chains/Chains";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { useMoralis } from "react-moralis";

import Account from "./Account";
import { Center } from "@chakra-ui/react";
import { StackDivider, VStack } from "@chakra-ui/react";

const SettingsMenu = () => {
  const [visible, setVisible] = useState(false);
  const { isAuthenticated } = useMoralis();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Center>
      <Button
        style={{ padding: "5px", marginBottom: "50px", width: "100px" }}
//        type="primary"
        className="loginButton"
        size="large"
        //shape="round"
        onClick={showDrawer}
      >
        Account
      </Button>
      <Drawer
        bodyStyle={{ backgroundColor:'#880a16', padding: "5px" }}
        //title="Settings"
        placement="bottom"
        height={600}
        onClose={onClose}
        visible={visible}
      >
        <Center>
          <VStack
            divider={<StackDivider borderColor="#f7b86a" />}
            spacing={8}
            style={{marginTop:'50px'}}
            align="center"
          >
            <div style={{marginTop:'0px'}}>{isAuthenticated ? <SignOut /> : <SignIn />}</div>
          </VStack>
        </Center>
      </Drawer>
    </Center>
  );
};

export default SettingsMenu;
