import raffleNft from "contracts/RaffleNft.json";

import {
  FileSearchOutlined,
  TransactionOutlined,
  ProfileOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Grid, GridItem, Center, Box, Link, HStack } from "@chakra-ui/react";
import { Tooltip, Modal, Image, Row, Col, Input } from "antd";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { AutoCenter } from "antd-mobile";
import { Button, Card, Avatar, List } from "antd";

export default function PlayerCard(entries) {
  const [initImage, setOne] = useState();
  const [thisName, setTwo] = useState();
  const [thisDesc, setThree] = useState();
  const [thisEdition, setFour] = useState();
  const [thisDate, setFive] = useState();
  const [playerTokenId, setPlayerTokenId] = useState();
  const [image, setImage] = useState();
  const [mintedId, setMintedId] = useState(null);
  const [loading, setLoading] = useState(false);
  /*

useEffect(() => {
  fetchMetadata()
}, [])
*/

  return (
    <>
      <Box></Box>
    </>
  );
}
