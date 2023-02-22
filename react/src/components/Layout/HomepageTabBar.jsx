import UseDappConnect from "../UseDapp/UseDappConnect";

import React, { useState } from "react";
import { Badge, TabBar } from "antd-mobile";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Card } from "antd";
import {
  ShopbagOutline,
  UploadOutline,
  UnorderedListOutline,
  UserOutline,
  CouponOutline,
} from "antd-mobile-icons";

export default function HomepageTabBar() {
  const tabs = [
    {
      key: "marketplace",
      title: [
        <>
          <Link to="/nft-marketplace">Market</Link>
        </>,
      ],
      icon: [
        <>
          <Link to="/nft-marketplace">
            <ShopbagOutline />
          </Link>
        </>,
      ],
      // badge: '1',
    },

    {
      key: "hashbox",
      title: [
        <>
          <Link to={"/ipfs"}>HashBox</Link>
        </>,
      ],
      icon: [
        <>
          <Link to={"/ipfs"}>
            <UploadOutline />
          </Link>
        </>,
      ],
    },

    {
      key: "collections",
      title: [
        <>
          <Link to={"/collections"}>Collections</Link>
        </>,
      ],
      icon: [
        <>
          <Link to={"/collections"}>
            <UnorderedListOutline />
          </Link>
        </>,
      ],
    },

    {
      key: "avatar",
      title: [
        <>
          <Link to={"/avatar/"}>Avatar</Link>
        </>,
      ],
      icon: [
        <>
          <Link to={"/avatar"}>
            <UserOutline />
          </Link>
        </>,
      ],
    },
    {
      key: "raffle",
      title: [
        <>
          <Link to={"/buny-raffle"}>Raffle</Link>
        </>,
      ],
      icon: [
        <>
          <Link to={"/buny-raffle"}>
            <CouponOutline />
          </Link>
        </>,
      ],
    },
  ];

  return (
    <>
      <Card
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#f9836e",
          color: "white",
        }}
        title={
          <>
            <Box w={360} color="white">
              <UseDappConnect />
            </Box>
          </>
        }
        bodyStyle={{ padding: "5px" }}
      >
        <TabBar>
          {tabs.map((item) => (
            <TabBar.Item
              style={{
                color: "white",
              }}
              key={item.key}
              icon={item.icon}
              title={item.title}
              badge={item.badge}
            />
          ))}
        </TabBar>
      </Card>
    </>
  );
}
