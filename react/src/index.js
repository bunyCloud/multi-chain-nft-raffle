import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Avalanche, AvalancheTestnet, DAppProvider } from "@usedapp/core";
import "./index.css";

const config = {
  readOnlyChainId: Avalanche.chainId,
  readOnlyUrls: {
    [Avalanche.chainId]:
      "https://avalanche-mainnet.infura.io/v3/46f4cd01725d4357a1539a393bca4f80",
    [AvalancheTestnet.chainId]:
      "https://avalanche-fuji.infura.io/v3/46f4cd01725d4357a1539a393bca4f80",
  },
};

const Application = () => {
  return <App />;
};
ReactDOM.render(
  // <React.StrictMode>
  <DAppProvider config={config}>
    <Application />,
  </DAppProvider>,
  // </React.StrictMode>,
  document.getElementById("root"),
);
