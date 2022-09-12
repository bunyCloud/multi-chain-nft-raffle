import database from "../list/database.json";
//import Address from "./Address/Address";
import { getNativeByChain } from "../helpers/networks";

import React from "react";
import { Card } from "antd";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Center } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";



//////////////////////////////////////
// Deployed Contract Event Log ///////
///////////////////////////////////////
const displayContractsCreated = (tokenData) => {
  return (
    <div style={{ padding: "2px", width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table variant="simple" size="md" overflow="auto">
          <Thead>
            <Tr>
              <Th>Contract Address</Th>
              <Th>Id</Th>
              <Th></Th>
              <Th style={{ padding: "5px" }}>Size</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tokenData.length !== 0 ? (
              tokenData.map((element, i) => {
                return (
                  <React.Fragment key={i}>
                    <Tr>
                      <Td>{element.get("editionContractAddress")}</Td>
                      <Td>{element.get("editionId")}</Td>
                      <Td></Td>
                      <Td style={{ padding: "5px" }}>
                        {element.get("editionSize")}{" "}
                      </Td>
                    </Tr>
                  </React.Fragment>
                );
              })
            ) : (
              <Tr>
                <Td></Td>
                <Td>No Transactions</Td>
                <Td></Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

function DynamicQuery() {
  const { account, chainId, walletAddress } = useMoralisDapp();
  
  const nativeName = getNativeByChain(chainId);
  const { Moralis } = useMoralis();
  const queryMarketItems = useMoralisQuery("FujiDynamicFactory");
  const fetchItems = JSON.parse(
  JSON.stringify(queryMarketItems.data, [
    "objectId",
    "createdAt",
    "editionContract",
    "editionId_decimal",
    "transaction_hash",
    "editionSize",
    
  ]),
  );
  
  const { data, isLoading } = useMoralisQuery(
    database[chainId]?.erc721dCreated ?? "FujiDynamicFactory",
    (query) => query.equalTo("creator", account).descending("createdAt"),

    [account, chainId],

    {
      live: true,
    },
  );

  return (
    <>
      <Card
        title="Dynamic Deployments"
        style={{
          width: "380px",
          margin: "auto",
          fontSize: 12,
          color: "black",
          borderColor: "darkblue",
          borderWidth: "0px",
        }}
      >
        <Center>
          {!isLoading && data !== null ? (
            displayContractsCreated(data)
          ) : (
            <p>Loading</p>
          )}
        </Center>
      </Card>
    </>
  );
}

export default DynamicQuery;
