import database from "../list/database.json";
//import Account from "./Account/Account";
//import ethereumSVG from "./icons/ethereum.svg";
import avaxSVG from "./icons/avax.svg";
//import polygonPNG from "./icons/polygon.png";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Image } from "@chakra-ui/react";
import logo  from '../bunyG.png';
import React from "react";
import { HStack, Box, Center } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import OwnerLoadContract from "./OwnerLoadContract";

//import Account from "./Account/Account";

import {
  Table,
  Thead,
  Divider,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
//import Chains from "./Chains";
import NativeBalance from "./NativeBalance";
import {Card} from 'antd';
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import DynamicQuery from "./DynamicQuery";
import Create from './Create';
import SellerItems from "./Nfts/SellerItems";


export default function SignOut() {
  const { logout, user } = useMoralis();
  const { account } = useMoralis();
  const { chainId } = useMoralisDapp();

 
  return (
    <Center>
      <Card>
      <Tabs>
        <Center>
          <TabList style={{ margin: "15px" }}>
            <HStack spacing="1px">
              <Box w="80px" h="30px"   fontSize="12px">
                <Tab className="ipfsTabs">Account</Tab>
              </Box>

              <Box w="80px" h="30px"  fontSize="12px">
                <Tab className="ipfsTabs">Contracts</Tab>
              </Box>
              <Box w="80px" h="30px"  fontSize="12px">
                <Tab className="ipfsTabs">Loader</Tab>
              </Box>
              <Box w="80px" h="30px"  fontSize="12px">
                <Tab className="ipfsTabs"> Tokens </Tab>
              </Box>
              <Box w="80px" h="30px"  fontSize="12px">
                <Tab className="ipfsTabs"> Create </Tab>
              </Box>
            </HStack>
          </TabList>
        </Center>
        <TabPanels>
          <TabPanel>
            <div>
              <Center>
            <img width={66} height={66} src={logo} alt="logo" />
</Center>
   <Card>
              <div style={{padding:'10px', backgroundColor:'black', color:'white'}} className="detailsDiv">
                <div style={{color:'white', textAlign:'center'}}>
                  <p>Account:</p>
                  <p>{user.attributes.accounts} </p>
                </div>
                <div style={{textAlign:'center', color:'white'}}>
                  <p>Balance (Eth)</p>
                    <NativeBalance />{" "}
                  
                </div>
              </div>
              </Card>
              <Center>
              <div className="fotter">
                <button className="ipfsTabs">Refresh</button>

                <button className="ipfsTabs" onClick={logout}>
                  Logout
                </button>
              </div>
              </Center>
            </div>
          </TabPanel>

          <TabPanel>
            <Tabs>
              <Center>
                <TabList style={{ margin: "auto", padding: "5px" }}>
                </TabList>
              </Center>
              <TabPanels>
                <TabPanel>
                <Box
                    title="erc721d Deployments"
                    style={{
                      width: "100%",
                      margin: "auto",
                      padding:'5px',
                      backgroundColor:'white',
                      marginTop:'2px',
                      fontSize: 12,
                      color: "black",
                    }}
                  >
                <DynamicQuery/>
                  </Box>{" "}
           
                </TabPanel>

              </TabPanels>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <OwnerLoadContract />
          </TabPanel>
          <TabPanel>
            <SellerItems/>
          </TabPanel>
          <TabPanel>
            <Create/>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Card>
    </Center>
  );
}
