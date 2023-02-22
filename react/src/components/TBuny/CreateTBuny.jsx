import { Box, HStack, VStack } from "@chakra-ui/react";
import { Button, Image, message, Steps } from "antd";
import { create } from "ipfs-http-client";
import { CopyIcon } from "@chakra-ui/icons";
import { FileUpload, ImageUpload } from "react-ipfs-uploader";
import { Center, IconButton, Tooltip } from "@chakra-ui/react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useClipboard } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  TBunyNftAddress,
  TBunyMarketplaceAddress,
} from "contracts/config/networkAddress";
import NFTAbi from "../../contracts/TBunyNft.json";
import NFTMarketplaceAbi from "../../contracts/TBunyMarketplace.json";
import { Input, Tag, Result, Select } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
const projectId = "25aFLOpT6wwyHnAAvLlpH0oPodw";
const projectSecret = "4c269229af2949eb44e23418406f1319";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const CreateTBuny = () => {
  //const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [deployInitiate, setDeployInitiate] = useState();
  const [deployStatus, setDeployStatus] = useState(null);
  const [ipfsUrl, setIpfsUrl] = useState();
  const [itemId, setItemId] = useState();
  const [formatTokenId, setFormatTokenId] = useState();
  const [listingItemId, setListingItemId] = useState();
  const [listingTokenId, setListingTokenId] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [isListing, setIsListing] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [animationFile, setAnimationFile] = useState();
  const [usdzFile, setUsdzFile] = useState();
  const [fileLog, setFileLog] = useState();
  const [mintStatus, setMintStatus] = useState();
  const [listingPrice, setListingPrice] = useState();
  const [tokenUrl, setTokenUrl] = useState();
  const [ipfsMetaLog, setIpfsMetaLog] = useState();
  const { onCopy, value, setValue, hasCopied } = useClipboard(tokenUrl);
  const { TextArea } = Input;
  const [universalSymbol, setUniversalSymbol] = useState();

  const [symbolData] = useState({
    california:
      "https://ipfs.io/ipfs/QmY2rfBSH42xma55uZWXvAKAerQKeKGQgSVUwtLNjYDK2B",
    colorado:
      "https://ipfs.io/ipfs/QmWo5mycMv3oFHFZ34HBapQTkmNJZxQasVUw5Byr2Tf1Z6",
    michigan:
      "https://ipfs.io/ipfs/QmbRKNe4HRBEwePTcSaAh53NKtsgTwZA8PXZxzSe52e7ag",
    nevada:
      "https://ipfs.io/ipfs/QmcpvZCv6xP1DPdgy3sBwQH75DnixDBbVQSYnjvRfe5LS4",
    oregon:
      "https://ipfs.io/ipfs/Qmbd2GS2HBU1WQCnu9ig49s7y4xFycFnXT5nKBPh6Dfdhy",
    washington:
      "https://ipfs.io/ipfs/QmWPboi372XGDW7NRKJpTG6vfy8jcCEqfbD83aBXqEMa5e",
  });

  const handleChange = (value) => {
    setUniversalSymbol(value);
    console.log(`selected ${value}`);
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    external_url: "",
    youtube_url: "",
    manufacturer: "",
    msrp: "",
    universalSymbol: "",
    batchNumber: "",
    licenseNumber: "",
    patentNumber: "",
    strain: "",
    origin: "",
    isOrganic: "",
    thcType: "",
    growType: "",
    weight: "",
    totalTHC: "",
    totalCBD: "",
    solvents: "",
    activeIngredients: "",
    inactiveIngredients: "",
    servingSize: "",
  });

  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    apiPath: "/api/v0",
    headers: {
      authorization: auth,
    },
  });

  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.avax.network/ext/bc/C/rpc",
  );

  const createItem = async (url) => {
    setIsListing(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    // Mint NFT token
    const nftContract = new ethers.Contract(
      TBunyNftAddress,
      NFTAbi.abi,
      signer,
    );
    const transaction = await nftContract.mintToken(url);
    const tx = await transaction.wait();
    // Set transaction explorer url
    setMintStatus(
      `Buny NFT Minted!.. https://snowtrace.io/tx/${transaction.hash}. Initiating transaction 2 of 2.`,
    );
    console.log(`https://snowtrace.io/tx/${transaction.hash}`);
    const event = tx.events[0];
    const value = event.args[2];
    const tokenId = value.toNumber();
    setListingTokenId(tokenId);
    setTokenUrl(`https://buny.cloud/token/${TBunyNftAddress}/${tokenId}`);
    // Convert ethers value
    const convertedPrice = ethers.utils.parseUnits(formData.msrp, "ether");
    // Create NFT market listing
    const nftMarketPlaceContract = new ethers.Contract(
      TBunyMarketplaceAddress,
      NFTMarketplaceAbi.abi,
      signer,
    );
    const listingPrice = await nftMarketPlaceContract.getListingPrice();
    const listingTx = await nftMarketPlaceContract.listItem(
      TBunyNftAddress,
      tokenId,
      convertedPrice,
      { value: listingPrice },
    );
    const ltx = await listingTx.wait();
    setDeployInitiate("NFT Market listing created", ltx);
    console.log(" NFT Market listing created.....", ltx);
    setDeployStatus(`https://snowtrace.io/tx/${listingTx.hash}`);
    const levent = ltx.events.find((x) => x.event === "ItemList");
    console.log(Number(levent.args.itemId));
    setListingItemId(Number(levent.args.itemId));
    const thisItemId = listingItemId;
    console.log("listing id:", thisItemId);
    setIsListing(false);
    setCurrent(current + 1);
    next();
  };

  const listAnItem = async () => {
    setIsListing(true);
    const {
      name,
      manufacturer,
      msrp,
      description,
      external_url,
      youtube_url,
      batchNumber,
      universalSymbol,
      licenseNumber,
      patentNumber,
      strain,
      origin,
      isOrganic,
      thcType,
      growType,
      weight,
      totalTHC,
      totalCBD,
      solvents,
      activeIngredients,
      inactiveIngredient,
      servingSize,
    } = formData;
    if (!name || !description || !imageFile) {
      console.log("Some feild are missing");
      setIsListing(false);
      return;
    }
    const data = JSON.stringify({
      name,
      description,
      external_url,
      youtube_url,
      image: imageFile,
      animation_url: animationFile,
      usdz: usdzFile,
      msrp,
      manufacturer,
      batchNumber,
      universalSymbol,
      licenseNumber,
      patentNumber,
      strain,
      origin,
      isOrganic,
      thcType,
      growType,
      weight,
      totalTHC,
      totalCBD,
      solvents,
      activeIngredients,
      inactiveIngredient,
      servingSize,
    });
    try {
      const add = await client.add(data);
      const url = `https://ipfs.io/ipfs/${add.path}`;
      createItem(url);
      console.log(url);
      setIpfsUrl(url);
      setIpfsMetaLog(
        `Metadata successfully uploaded to IPFS. Initiating transaction 1 of 2.. ${url}`,
      );
    } catch (error) {
      console.log("upload error, cannot resolve ", error);
    }
  };

  async function fetchListingPrice() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const contract = new ethers.Contract(
        TBunyMarketplaceAddress,
        NFTMarketplaceAbi.abi,
        provider,
      );
      try {
        const data = await contract.getListingPrice();
        const price = ethers.utils.formatEther(data.toString());
        console.log(`Listing price: ${price}`);
        setListingPrice(price);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  const steps = [
    {
      title: [
        <>
          <p
            style={{
              color: "blue",
              fontSize: "10px",
            }}
          >
            Details
          </p>
        </>,
      ],
      content: [
        <>
          <Box color="black">
            <h6>Create NFT Listing</h6>
            <Center>
              <HStack>
                <div
                  style={{
                    marginLeft: "20px",
                    width: "auto",
                    fontSize: "12px",
                  }}
                >
                  <Tooltip title="View marketplace contract">
                    <Button
                      type="link"
                      shape="circle"
                      onClick={() =>
                        window.open(
                          `https://snowtrace.io/address/${TBunyMarketplaceAddress}`,
                          "_blank",
                        )
                      }
                      icon={<FileSearchOutlined />}
                    >
                      View Contract
                    </Button>
                  </Tooltip>
                </div>
                <div
                  style={{ width: "auto", padding: "5px", fontSize: "12px" }}
                >
                  Listing fee: {listingPrice} | AVAX
                </div>
              </HStack>
            </Center>
            <Center>
              <Box w={300}>
                <form action="">
                  <p style={{ padding: "2px", fontSize: "13px" }}>
                    {" "}
                    <strong>Item Name*</strong>
                  </p>

                  <TextArea
                    showCount
                    id="name"
                    placeholder="e.g.  Rabbit NFT Club"
                    placeholder="Item Name"
                    maxLength={100}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    style={{
                      height: 60,
                      marginBottom: 14,
                    }}
                  />

                  <p style={{ padding: "2px", fontSize: "13px" }}>
                    {" "}
                    <strong>Item Description*</strong>
                  </p>

                  <TextArea
                    showCount
                    id="description"
                    placeholder="Your NFT or product description."
                    placeholder="Description"
                    width="auto"
                    maxLength={400}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    style={{
                      height: 120,
                      width: "auto",
                      marginBottom: 24,
                    }}
                  />
                  <Box w={300} bg="transparent" mt={30} mb={15}>
                    <p style={{ padding: "2px", fontSize: "13px" }}>
                      {" "}
                      <strong>External Url (Optional)</strong>
                    </p>

                    <Center>
                      <VStack>
                        <Input
                          placeholder="External Url"
                          id="external_url"
                          placeholder="External Url"
                          style={{
                            width: 250,
                            marginBottom: 4,
                            marginTop: 4,
                          }}
                          onChange={(e) => {
                            console.log(formData.external_url);
                            setFormData({
                              ...formData,
                              external_url: e.target.value,
                            });
                          }}
                        />
                      </VStack>
                    </Center>
                    <p
                      style={{
                        padding: "2px",
                        marginTop: "6px",
                        fontSize: "13px",
                      }}
                    >
                      {" "}
                      <strong>Youtube Url (Optional)</strong>
                    </p>
                    <Center>
                      <VStack>
                        {" "}
                        <Input
                          placeholder="Youtube Url"
                          id="youtube_url"
                          style={{
                            width: 250,
                            marginBottom: 4,
                            marginTop: 4,
                          }}
                          onChange={(e) => {
                            console.log(formData.youtube_url);
                            setFormData({
                              ...formData,
                              youtube_url: e.target.value,
                            });
                          }}
                        />
                      </VStack>
                    </Center>
                  </Box>
                </form>
              </Box>
            </Center>
            <Box>
              <Center>
                <Wrap>
                  <WrapItem>
                    <Avatar
                      boxSize="1.5em"
                      name="California"
                      src={symbolData.california}
                    />
                  </WrapItem>
                  <WrapItem>
                    <Avatar
                      boxSize="1.5em"
                      name="Colorado"
                      src={symbolData.colorado}
                    />
                  </WrapItem>
                  <WrapItem>
                    <Avatar
                      boxSize="1.5em"
                      name="Michigan"
                      src={symbolData.michigan}
                    />
                  </WrapItem>
                  <WrapItem>
                    <Avatar
                      boxSize="1.5em"
                      name="Nevada"
                      src={symbolData.nevada}
                    />
                  </WrapItem>
                  <WrapItem>
                    <Avatar
                      boxSize="1.5em"
                      name="Oregon"
                      src={symbolData.oregon}
                    />
                  </WrapItem>
                  <WrapItem>
                    <Avatar
                      boxSize="1.5em"
                      name="Washington"
                      src={symbolData.washington}
                    />
                  </WrapItem>
                </Wrap>
              </Center>
              <Box>
                <div style={{ fontSize: "12px" }}>
                  Universal Cannabis Warning Symbol By State
                </div>
                <Select
                  defaultValue={"California"}
                  value={universalSymbol}
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: symbolData.colorado,
                      label: "Colorado",
                    },
                    {
                      value: symbolData.california,
                      label: "California",
                    },
                    {
                      value: symbolData.nevada,
                      label: "Nevada",
                    },
                    {
                      value: symbolData.oregon,
                      label: "Oregon",
                    },
                    {
                      value: symbolData.michigan,
                      label: "Michigan",
                    },
                    {
                      value: symbolData.washington,
                      label: "Washington",
                    },
                  ]}
                />
              </Box>
            </Box>
            <div style={{ fontSize: "12px" }}>
              *Universal warning symbol required by state.
            </div>
          </Box>
        </>,
      ],
    },
    {
      title: [
        <>
          <p
            style={{
              color: "blue",
              fontSize: "10px",
            }}
          >
            Metadata
          </p>
        </>,
      ],
      content: [
        <>
          <Box color="black">
            <Tag
              color="#108ee9"
              style={{ borderRadius: "2px", color: "white" }}
            >
              NFT Attributes
            </Tag>
            <Center>
              <VStack>
                <Box w={300} fontSize="12px">
                  Enter Item Specifications
                </Box>
                <Input
                  id="manufacturer"
                  placeholder="Manufacturer"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.manufacturer);
                    setFormData({ ...formData, manufacturer: e.target.value });
                  }}
                />
                <Input
                  id="msrp"
                  placeholder="MSRP"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.msrp);
                    setFormData({ ...formData, msrp: e.target.value });
                  }}
                />
                <Input
                  id="batchNumber"
                  placeholder="Batch Number"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.batchNumber);
                    setFormData({ ...formData, batchNumber: e.target.value });
                  }}
                />
                <Input
                  id="licenseNumber"
                  placeholder="License Number"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.licenseNumber);
                    setFormData({ ...formData, licenseNumber: e.target.value });
                  }}
                />
                <Input
                  id="patentNumber"
                  placeholder="Patent Number"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.patentNumber);
                    setFormData({ ...formData, patentNumber: e.target.value });
                  }}
                />
                <Input
                  id="strain"
                  placeholder="Strain"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.strain);
                    setFormData({ ...formData, strain: e.target.value });
                  }}
                />
                <Input
                  id="thcType"
                  placeholder="Type"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.thcType);
                    setFormData({ ...formData, thcType: e.target.value });
                  }}
                />
                <Input
                  id="origin"
                  placeholder="Origin"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.origin);
                    setFormData({ ...formData, origin: e.target.value });
                  }}
                />
                <Input
                  id="isOrganic"
                  placeholder="Is Organic?"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.isOrganic);
                    setFormData({ ...formData, isOrganic: e.target.value });
                  }}
                />
                <Input
                  id="growType"
                  placeholder="Grow Type?"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.growType);
                    setFormData({ ...formData, growType: e.target.value });
                  }}
                />
                <Input
                  id="weight"
                  placeholder="Weight"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.weight);
                    setFormData({ ...formData, weight: e.target.value });
                  }}
                />
                <Input
                  id="servingSize"
                  placeholder="Serving Size"
                  style={{
                    width: "300px",
                    padding: "5px",
                    color: "black",
                    margin: "10px",
                  }}
                  onChange={(e) => {
                    console.log(formData.servingSize);
                    setFormData({ ...formData, servingSize: e.target.value });
                  }}
                />
                <Input
                  id="totalTHC"
                  placeholder="Total THC"
                  addonAfter="%"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.totalTHC);
                    setFormData({ ...formData, totalTHC: e.target.value });
                  }}
                />
                <Input
                  id="totalCBD"
                  placeholder="Total CBD"
                  addonAfter="%"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.totalCBD);
                    setFormData({ ...formData, totalCBD: e.target.value });
                  }}
                />
                <Input
                  id="solvents"
                  placeholder="Solvents"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.solvents);
                    setFormData({ ...formData, solvents: e.target.value });
                  }}
                />
                <TextArea
                  rows={4}
                  id="activeIngredients"
                  placeholder="Active Ingredients"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.activeIngredients);
                    setFormData({
                      ...formData,
                      activeIngredients: e.target.value,
                    });
                  }}
                />
                <TextArea
                  rows={4}
                  id="inactiveIngredients"
                  placeholder="Inactive Ingredients"
                  style={{
                    width: "300px",
                    padding: "5px",
                  }}
                  onChange={(e) => {
                    console.log(formData.inactiveIngredients);
                    setFormData({
                      ...formData,
                      inactiveIngredients: e.target.value,
                    });
                  }}
                />
              </VStack>
            </Center>
          </Box>
        </>,
      ],
    },
    {
      title: [
        <>
          <p
            style={{
              color: "blue",
              fontSize: "10px",
            }}
          >
            Media
          </p>
        </>,
      ],
      content: [
        <>
          <Box color="black" w={"auto"} p={5}>
            {/* initially mounted */}
            <p style={{ fontSize: "14px", padding: "5px" }}>
              All media is uploaded to IPFS(InterPlanetary File System) for
              decentralized storage.
            </p>
            <Tag
              color="#108ee9"
              style={{ borderRadius: "2px", color: "white", float: "left" }}
            >
              Image
            </Tag>

            <Box
              bg="#1F2937"
              color="white"
              w={"auto"}
              fontSize="12px"
              p={25}
              mt={"-0px"}
            >
              <p>Primary NFT image displayed across all platforms.</p>
              <ImageUpload setUrl={setImageFile} />
              Extensions:( *.png, *.gif, *jpg)
              <Center>
                <div>
                  {imageFile && (
                    <>
                      <Box bg="white" p={15}>
                        <img src={imageFile} width="100px" height="100px" />
                      </Box>
                    </>
                  )}
                </div>
              </Center>
              <a href={imageFile} target="_blank" rel="noopener noreferrer">
                {imageFile}
              </a>
            </Box>
            <Tag
              color="#108ee9"
              style={{ borderRadius: "2px", color: "white", float: "left" }}
            >
              Animation
            </Tag>
            <Box width="auto" bg="white" color="black" fontSize="12px" p={25}>
              <p style={{ padding: "5px" }}>
                {" "}
                <strong>
                  Animation url slot displayed across most platforms.{" "}
                </strong>
              </p>
              <FileUpload setUrl={setAnimationFile} />
              Extensions:( *.glb, *.gltf, *.gif, webm, mp4, OGV, wav, mp3 )
              <Center>
                <div>
                  {animationFile && (
                    <>
                      <model-viewer
                        style={{ width: "180px", height: "180px" }}
                        camera-controls
                        poster={animationFile}
                        src={animationFile}
                      ></model-viewer>
                    </>
                  )}
                </div>
              </Center>
              <a href={animationFile} target="_blank" rel="noopener noreferrer">
                {animationFile}
              </a>
            </Box>
            <Tag
              color="#108ee9"
              style={{ borderRadius: "2px", color: "white", float: "left" }}
            >
              IOS
            </Tag>
            <Box
              bg="#1F2937"
              color="white"
              w={"auto"}
              fontSize="12px"
              p={25}
              mt={"-0px"}
            >
              <Box>
                USDZ 3D model file required for AR functionality on IOS devices.{" "}
              </Box>
              <FileUpload setUrl={setUsdzFile} />{" "}
              <p style={{ padding: "5px" }}>
                {" "}
                <strong>3D Model (IOS):</strong> Single 3D NFT: Extensions:(
                *.usdz)
              </p>
              <Center>
                <div>
                  {usdzFile && (
                    <>
                      <model-viewer
                        style={{ width: "180px", height: "180px" }}
                        camera-controls
                        poster={usdzFile}
                        src={usdzFile}
                      ></model-viewer>
                    </>
                  )}
                </div>
              </Center>
              <a href={usdzFile} target="_blank" rel="noopener noreferrer">
                {usdzFile}
              </a>
            </Box>

            {/* initially not mounted */}
          </Box>
        </>,
      ],
    },
    {
      title: [
        <>
          <p
            style={{
              color: "blue",
              fontSize: "10px",
            }}
          >
            Deploy
          </p>
        </>,
      ],
      content: [
        <>
          <Box color="black" bg="white" p={10} w={"auto"}>
            <p style={{ textAlign: "left", fontSize: "12px", padding: "5px" }}>
              {" "}
              Please review details for accuracy. To make changes use the back
              button below.
            </p>
            <Box
              fontSize="12px"
              textAlign="left"
              p={5}
              bg="#1F2937"
              color="white"
            >
              <h6 style={{ color: "white", marginTop: "5px" }}>Item Details</h6>
              <div>Name: {formData.name}</div>
              <div>Description: {formData.description}</div>
              <div>MSRP: {formData.msrp}</div>
              <div>Image: {imageFile}</div>
              <div>GLB/GLTF: {animationFile}</div>
              <div>IOS USDZ: {usdzFile}</div>
              <div>External Url: {formData.external_url}</div>
              <div>Youtube Url: {formData.youtube_url}</div>
              <Box>
                <h6 style={{ color: "white", marginTop: "5px" }}>Attributes</h6>
                <div>Manufacturer: {formData.manufacturer}</div>
                <div>Batch #: {formData.batchNumber}</div>
                <div>License #: {formData.licenseNumber}</div>
                <div>Patent Number: {formData.patentNumber}</div>
                <div>Strain: {formData.strain}</div>
                <div>Origin: {formData.origin}</div>
                <div>Is Organic: {formData.isOrganic}</div>
                <div>Grow Type: {formData.growType}</div>
                <div>Category: {formData.thcType}</div>
                <div>Weight: {formData.weight}</div>
                <div>Serving Size: {formData.servingSize}</div>
                <div>Total THC: {formData.totalTHC}</div>
                <div>Total CBD: {formData.totalCBD}</div>
                <div>Solvents: {formData.solvents}</div>
                <div>Active Ingredients: {formData.activeIngredients}</div>
                <div>Inactive Ingredients: {formData.inactiveIngredients}</div>
              </Box>
              <Center p="10" bg="white">
                <VStack color="black" bg="white">
                  <div>
                    {universalSymbol && (
                      <>
                        <div>Universal Cannabis Warning:</div>
                        <Center>
                          <Image src={universalSymbol} width="100px" />
                        </Center>
                      </>
                    )}
                  </div>
                </VStack>
              </Center>
            </Box>
            <Center>
              <VStack>
                <Box w={"auto"} fontSize="12px" p={5} m={5}>
                  <p style={{ padding: "6px" }}>
                    Once satisifed you may proceed by clicking the Mint button
                    below.
                  </p>
                  <div style={{ textAlign: "left", padding: "5px" }}>
                    <p>
                      <strong style={{ marginRight: "5px" }}>
                        Transaction 1
                      </strong>
                      Mint NFT token using the information provided.
                    </p>
                    <p>
                      <strong style={{ marginRight: "5px" }}>
                        Transaction 2
                      </strong>{" "}
                      List NFT in TBuny Directory.
                    </p>
                  </div>
                  <Center>
                    <HStack>
                      <div>
                        {imageFile && (
                          <>
                            <img
                              src={imageFile}
                              width="100px"
                              height="100px"
                              padding="5px"
                            />
                          </>
                        )}
                      </div>

                      <div>
                        {animationFile && (
                          <>
                            <model-viewer
                              style={{ width: "100px", height: "100px" }}
                              camera-controls
                              poster={animationFile}
                              src={animationFile}
                              ios-src={usdzFile}
                            ></model-viewer>
                          </>
                        )}
                      </div>
                    </HStack>
                  </Center>
                </Box>

                <Button
                  block
                  className="btn-primary"
                  style={{
                    fontSize: 18,
                    width: "100%",
                    color: "white",
                    marginBottom: "8px",
                    marginTop: "8px",
                    backgroundColor: "#108ee9",
                    border: "1px solid blue",
                  }}
                  onClick={listAnItem}
                  disabled={isListing}
                >
                  Mint & List NFT
                </Button>
                <Center>
                  <Box>
                    <div
                      style={{
                        padding: "5px",
                        backgroundColor: "#f3fdff",
                        width: "100%",
                        overflow: "hidden",
                        fontSize: "12px",
                        color: "black",
                        minHeight: "30px",
                        //margin: "5px",
                        border: "1px solid white",
                      }}
                    >
                      <p>{fileLog}</p>
                      <p>{ipfsMetaLog}</p>
                      <p id="mintStatus">{mintStatus}</p>{" "}
                    </div>
                  </Box>
                </Center>
              </VStack>
            </Center>
          </Box>
        </>,
      ],
    },
    {
      title: [
        <>
          <p
            style={{
              color: "blue",
              fontSize: "10px",
            }}
          >
            Results
          </p>
        </>,
      ],
      content: [
        <>
          <Center>
            <Box
              p={15}
              m={5}
              fontWeight="semibold"
              color="white"
              fontSize="12px"
              minHeight="200px"
              bg="#1F2937"
              w={"auto"}
              minWidth="300px"
              maxWidth="500px"
              lineHeight="tight"
            >
              {!tokenUrl && <>No transaction found....</>}
              {tokenUrl && (
                <Result
                  status="success"
                  title={[
                    <>
                      <p style={{ color: "white" }}>Successfully Minted NFT!</p>
                      <p style={{ color: "white" }}>{formatTokenId}</p>
                      <p style={{ color: "white" }}> {itemId}</p>
                    </>,
                  ]}
                  subTitle={[
                    <>
                      <Center>
                        <div>
                          {imageUrl && (
                            <model-viewer
                              style={{
                                width: "350px",
                                height: "350px",
                                marginBottom: "5px",
                              }}
                              camera-controls
                              poster={imageUrl}
                              alt="GLB model"
                              src={imageUrl}
                              auto-rotate
                            ></model-viewer>
                          )}
                        </div>
                      </Center>
                      <HStack>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#9c9c9c",
                            padding: "15px",
                            marginBottom: "-10px",
                            fontWeight: "normal",
                            maxWidth: "320px",
                            overflow: "hidden",
                          }}
                        >
                          <Box isTruncated>
                            <a href={tokenUrl}>{tokenUrl} </a>
                          </Box>
                        </div>
                        <Tooltip title="Copy to clipboard">
                          <IconButton
                            m={5}
                            p={5}
                            onClick={onCopy}
                            variant="outline"
                            aria-label="Copy to clipboard"
                            icon={<CopyIcon />}
                          >
                            {hasCopied ? "Copied!" : "Copy"}
                          </IconButton>
                        </Tooltip>
                      </HStack>
                    </>,
                  ]}
                  extra={[
                    <Button type="primary" key="tokenpage" href={tokenUrl}>
                      View NFT page
                    </Button>,
                    <Button key="market" href="/nft-marketplace">
                      Back to marketplace
                    </Button>,
                  ]}
                />
              )}
            </Box>
          </Center>
        </>,
      ],
    },
  ];

  useEffect(() => {
    fetchListingPrice();
  }, []);

  useEffect(() => {
    if (imageFile) {
      setImageUrl(imageFile);
      console.log(`Image uploaded to IPFS ${imageFile}`);
    } else {
      console.log("Image not loading....");
    }
  }, [imageFile, setImageUrl]);

  useEffect(() => {
    if (listingItemId > 0) {
      console.log("Listing Item ID:", listingItemId);
      setItemId(`Your listing item id is: ${listingItemId}`);
    } else {
      console.log("No listing ID found, please complete deployment..");
    }
  }, [listingItemId]);

  useEffect(() => {
    if (listingTokenId > 0) {
      console.log("Your token Id:", listingTokenId);
      setFormatTokenId(`Your Token Id is: ${listingTokenId}`);
    } else {
      console.log("No Token ID found, please mint token first ..");
    }
  }, [listingTokenId]);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "15px",
    textAlign: "center",
    color: "white",
    backgroundColor: "white",
    padding: "15px",
    minWidth: "300px",
    borderRadius: "5px",
    border: `1px solid blue`,
    marginTop: 12,
  };
  return (
    <>
      <VStack bg="white">
        <Box w={"100%"}>
          <Steps
            size="small"
            type="inline"
            current={current}
            items={items}
            style={{
              paddingLeft: "0px",
              padding: "15px",
              marginBottom: "-25px",
              backgroundColor: "transparent",
            }}
          />
        </Box>
        <Box maxWidth="600px" minWidth="300px" w="100%">
          <div style={contentStyle}>{steps[current].content}</div>
        </Box>
        <HStack>
          <div
            style={{
              marginTop: 4,
              marginBottom: 8,
            }}
          >
            {current > 0 && (
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
          </div>
        </HStack>
      </VStack>
    </>
  );
};
export default CreateTBuny;
