import { NftExplore } from "pages/NftExplore";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Moralis from "moralis";
import Create from "./components/Create";
//import NFTTokenIds from "./components/NFTTokenIds";
import { Menu,Card, Layout } from "antd";
import SearchCollections from "./components/SearchCollections";
import "antd/dist/antd.css";
import "./style.css";
import SettingsMenu from './components/SettingsMenu';
import logo from './bunyG.png';
//import DutchAuctions from './components/DutchAuctions';
import AllNFTs from "components/Nfts/AllNFTs";
import SellerItems from "components/Nfts/SellerItems";
import FetchProducts from "components/Rutter/FetchProducts";



const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "80px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  const [inputValue, setInputValue] = useState("explore");

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

 
  return (
    <Layout style={{ height: "100vh", overflow: "auto", backgroundColor:'black' }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <SearchCollections/>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{
              display: "flex",
              backgroundColor:'#880a16',
              fontSize: "17px",
              fontWeight: "500",
              marginLeft: "20px",
              width: "80%",
            }}
            defaultSelectedKeys={["nftMarket"]}
          >
            <Menu.Item key="nftMarket" onClick={() => setInputValue("explore")}>
              <NavLink to="/NFTMarketPlace">Market</NavLink>
            </Menu.Item>
            <Menu.Item key="syncProducts">
              <NavLink to="/SyncProducts">Sync</NavLink>
            </Menu.Item>
                    
            <Menu.Item key="deploy">
              <NavLink to="/deployContract">Create</NavLink>
            </Menu.Item>
            <Menu.Item key="transactions">
              <NavLink to="/Transactions">Explorer</NavLink>
            </Menu.Item>
            
          </Menu>
          <div style={styles.headerRight}>

          </div>
        </Header>
        <div style={styles.content}>
          <Switch>
            <Route path="/nftBalance">
              <SellerItems/>
              
            </Route>
            <Route path="/NFTMarketPlace">
            <Card style={{width:'800px',  backgroundColor: 'white'}}>

<AllNFTs/>
              </Card>
            </Route>
            <Route path="/Transactions">
            <NftExplore />
            </Route>
            <Route path="/deployContract">
              <Create />
            </Route>
            <Route path ="/SyncProducts">
              <FetchProducts/>
            </Route>
            
          </Switch>
          <Redirect to="/NFTMarketPlace" />
        </div>
      </Router>

      <Footer
        style={{
          borderTop: "2px solid gold",
          position: "fixed",
          left: 0,
          bottom: 0,
          zIndex: "1",
          padding: "10px",
          height: "60px",
          width: "100%",
          backgroundColor: "#880a16",
          textAlign: "center",
        }}
      >
        <SettingsMenu />{" "}
      </Footer>

    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <img width={100} src={logo} alt="logo" />
  </div>
);
export default App;
