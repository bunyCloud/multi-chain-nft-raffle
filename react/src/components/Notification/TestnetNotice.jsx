import React from "react";
import { NoticeBar } from "antd-mobile";
import { CompassOutline } from "antd-mobile-icons";

export default function TestnetNotice() {
  return (
    <>
      <NoticeBar
        style={{ minWidth: "350px", color: "blue", fontSize: "12px" }}
        content="Experimental beta dapp currently being developed on Avalanche Fuji Testnet  "
        wrap="true"
        delay={"10000"}
        icon={<CompassOutline />}
        color="alert"
      />
    </>
  );
}
