import MyItemsMini from "./Nfts/MyItemsMini";
import {
  FileAddOutlined,
  FileSearchOutlined,
  CaretUpOutlined,
  ShoppingOutlined,
  WalletOutlined,
  FundViewOutlined,
  ReadOutlined,
  IssuesCloseOutlined,
  QuestionCircleOutlined,
  DashboardOutlined,
  UploadOutlined,
  ToolOutlined,
  FolderAddOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { abi } from "contracts/HashBoxFactory.json";
import { ethers } from "ethers";
import { HashBoxFactoryAddress } from "contracts/config/networkAddress.jsx";
import { CouponOutline } from "antd-mobile-icons";
import { NavBar, TabBar } from "antd-mobile";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  MemoryRouter as Router,
} from "react-router-dom";
import { AppOutline } from "antd-mobile-icons";
import {
  Box,
  Center,
  IconButton,
  Icon,
  createIcon,
  Link,
  HStack,
} from "@chakra-ui/react";
import { Menu } from "antd";
import { formatEther } from "@ethersproject/units";
import { Stack } from "@chakra-ui/react";
import { Tag, Button } from "antd";
import { useEtherBalance, useEthers } from "@usedapp/core";
import AccountDrawerIndex from "./AccountDrawerIndex";
import UseDappConnect from "./UseDapp/UseDappConnect";

const styles = {
  app: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
  },
  top: {
    flex: "0",
    backgroundColor: "#f9836e",
    color: "white",
    //borderBottom: 'solid 4px black',
  },
  body: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    overflowY: "auto",
    alignItems: "center",
    color: "white",
    marginBottom: "10px",
    border: "3px solid #b3e880",
    backgroundColor: "white",
  },
  bottom: {
    flex: "0",
    borderTop: "solid 4px #b3e880",
  },
};

const onChange = (key) => {
  console.log(key);
};

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem(<Link href="/dashboard">Dashboard</Link>, "1", <DashboardOutlined />),
  getItem(
    <Link href="/nft-marketplace">Marketplace</Link>,
    "2",
    <ShoppingOutlined />,
  ),
  getItem(
    <Link href="/create-market-nft">Create NFT Listing</Link>,
    "3",
    <FileAddOutlined />,
  ),
  getItem(
    <Link href="/collections">View Collections</Link>,
    "4",
    <FundViewOutlined />,
  ),
  getItem(
    <Link href="/create-collection">Create NFT Collection</Link>,
    "5",
    <FolderAddOutlined />,
  ),

  getItem(<Link href="/ipfs">IPFS HashBox</Link>, "6", <UploadOutlined />),

  getItem(<Link href="/buny-raffle">Buny Raffle</Link>, "7", <CouponOutline />),
  getItem(<Link href="/help">Help</Link>, "9", <QuestionCircleOutlined />),
  getItem(
    <Link href="/TheBunyProject">The Buny Project</Link>,
    "10",
    <CaretUpOutlined />,
  ),
];

const toolItems = [
  getItem(
    <Link target="_blank" href="https://explorer.buny.cloud/">
      Block Explorer
    </Link>,
    "1",
    <FileSearchOutlined />,
  ),
  getItem(
    <Link href="/contract-loader">Contract Loader</Link>,
    "2",
    <ReadOutlined />,
  ),
  getItem(
    <Link target="_blank" href="https://wallet.buny.cloud/">
      Avax Wallet
    </Link>,
    "3",
    <WalletOutlined />,
  ),

  getItem(
    <Link href="/support" target="_blank">
      Resources
    </Link>,
    "4",
    <MessageOutlined />,
  ),
];

const onClick = (e) => {
  console.log("click ", e);
};

const Bottom = () => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const setRouteActive = (value) => {
    history.push(value);
  };
  const tabs = [
    {
      key: "/menu",
      title: "Menu",
      icon: <AppOutline />,
    },

    {
      key: "/activity",
      title: "Activity",
      icon: <IssuesCloseOutlined />,
    },
    {
      key: "/tools",
      title: "Tools",
      icon: <ToolOutlined />,
    },
  ];
  return (
    <div
      style={{
        backgroundColor: "#f9fcfb",
      }}
    >
      <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};
export default function AccountDrawerLayout(props) {
  const [myName, setMyName] = useState(null);
  const [myPublicKey, setMyPublicKey] = useState(null);

  const { activateBrowserWallet, deactivate, account } = useEthers();
  const userBalance = useEtherBalance(account);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const CONTRACT_ADDRESS = HashBoxFactoryAddress;
  const [myContract, setMyContract] = useState(null);
  const [loading, setLoading] = useState(false);

  // Save the contents of abi in a variable
  const contractABI = abi;
  let provider;
  let signer;

  async function loginUser() {
    setIsLoggedIn(false);
    activateBrowserWallet();
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    setMyContract(contract);
    const address = await signer.getAddress();
    let present = await contract.checkUserExists(address);
    let username;
    if (present) username = await contract.getUsername(address);
    else {
      username = prompt(
        "Select a username carefully to be associated with your wallet address",
        null,
      );
      if (username === "") username = null;
      await contract.createAccount(username);
    }
    setMyName(username);
    setMyPublicKey(address);
    setIsLoggedIn(true);
  }

  return (
    <Router initialEntries={["/menu"]}>
      <div style={styles.app}>
        <div style={styles.top}>
          <NavBar onBack={props.onClose}>
            <Center bg="#f9836e" p={5}>
              <UseDappConnect />
            </Center>
          </NavBar>
        </div>
        <Box w={"auto"} color="white" bg="#black">
          {/*
          <Box w={'auto'} mt={-5} bg={'#f9836e'} color={'white'} fontSize="12px" border="0px solid white" p={10}>
            <Center>{userBalance && <p>Balance: {formatEther(userBalance).slice(0, 5)} AVAX </p>}</Center>
            <Center>
              <div
                style={{
                  backgroundColor: '#f9836e',
                  width: '100%',
                  color: 'white',
                  textAlign: 'center',
                  marginRight: '4px',
                }}>
                {account && `Account: ${account.slice(0, 4)}...${account.slice(account.length - 4, account.length)}`}
              </div>
            </Center>

            <Center>
              <Stack direction="column" m={5} alignItems="center">
                <div>
                  {!account && <Button onClick={loginUser}> Connect </Button>}
                  {account && (
                    <>
                      <HStack>
          
                        
                        <Button style={{color:'white'}} type="link" icon={<LogoutOutlined />} onClick={deactivate}>
                          Logout
                        </Button>
                      </HStack>
                    </>
                  )}
                </div>
              </Stack>
            </Center>
          </Box>
          */}
        </Box>
        <div style={styles.body}>
          <Switch>
            <Route exact path="/menu">
              <ThisMenu />
            </Route>

            <Route exact path="/activity">
              <Activity />
            </Route>
            <Route exact path="/tools">
              <Tools />
            </Route>
          </Switch>
        </div>
        <div className={styles.bottom}>
          <Bottom />
        </div>
      </div>
    </Router>
  );
}
function ThisMenu() {
  return (
    <div style={{ backgroundColor: "#c2dde6", width: "100%" }}>
      <Menu
        style={{ padding: "5px", width: "auto" }}
        onClick={onClick}
        mode="inline"
        items={items}
      />
    </div>
  );
}

function Activity() {
  return <div>activity</div>;
}
function Tools() {
  return (
    <div>
      {" "}
      <Menu
        style={{ padding: "15px", width: "380px" }}
        onClick={onClick}
        mode="inline"
        items={toolItems}
      />
    </div>
  );
}
