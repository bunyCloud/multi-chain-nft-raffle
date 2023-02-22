import React from "react";
import ReactDOM from "react-dom";
import { formatEther } from "@ethersproject/units";
import {
  Avalanche,
  DAppProvider,
  useEtherBalance,
  useEthers,
  AvalancheTestnet,
} from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { AccountIcon } from "./components/AccountIcon";

const config = {
  readOnlyChainId: Avalanche.chainId,
  readOnlyUrls: {
    [Avalanche.chainId]:
      "https://avalanche-mainnet.infura.io/v3/46f4cd01725d4357a1539a393bca4f80",
    [AvalancheTestnet.chainId]:
      "https://avalanche-fuji.infura.io/v3/46f4cd01725d4357a1539a393bca4f80",
  },
};

const STAKING_CONTRACT = "0x00000000219ab540356cBB839Cbe05303d7705Fa";

export function UseDappCore() {
  const { account, activateBrowserWallet, deactivate, chainId } = useEthers();
  const userBalance = useEtherBalance(account);
  const stakingBalance = useEtherBalance(STAKING_CONTRACT);
  if (!config.readOnlyUrls[chainId]) {
    return (
      <p style={{ color: "white", fontSize: "12px" }}>
        Please use either Avalanche or Fuji testnet.
      </p>
    );
  }

  const ConnectButton = () => (
    <div>
      <button onClick={() => activateBrowserWallet()}>Connect</button>
      <p>Connect to wallet to interact with the example.</p>
    </div>
  );

  const MetamaskConnect = () => (
    <div>
      {account && (
        <div>
          <div className="inline">
            <AccountIcon account={account} />
            &nbsp;
            <div className="account">{account}</div>
          </div>
          <br />
        </div>
      )}
      {!account && <ConnectButton />}
      {account && <button onClick={deactivate}>Disconnect</button>}
      <br />
    </div>
  );

  return (
    <div>
      <MetamaskConnect />
      {userBalance && (
        <div className="balance">
          <br />
          Ether balance:
          <p className="bold">{formatEther(userBalance)} ETH</p>
        </div>
      )}
      {stakingBalance && (
        <div className="balance">
          ETH2 staking balance:
          <p className="bold">{formatEther(stakingBalance)} ETH</p>
        </div>
      )}
    </div>
  );
}
