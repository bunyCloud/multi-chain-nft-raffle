export const networkCollections = {
  "0xa869": [
    //Add Your Collections here
    {
      image:
        "https://lh3.googleusercontent.com/BWCni9INm--eqCK800BbRkL10zGyflxfPwTHt4XphMSWG3XZvPx1JyGdfU9vSor8K046DJg-Q8Y4ioUlWHiCZqgR_L00w4vcbA-w=s0",
      name: "Buny Demo Collection",
      addrs: "",
    },
    {
      image:
        "https://ipfs.moralis.io:2053/ipfs/QmfLbpeVHxReWKNLaXTPcWiafi49eoAL4gRwMGuXtx2Eqe/images/14.png",
      name: "Sheep",
      addrs: "0x01FCB818004920D2707C8EFD5AE886E3A02847eA",
    },
    {
      image:
      "https://gateway.pinata.cloud/ipfs/Qmb4PbQA3Z1xpcKCnoGdBEwnLZMhGbWQUrWe6TGeAcnLkT",
      name: "Avax Buny Test",
      addrs: "0x01FCB818004920D2707C8EFD5AE886E3A02847eA",
    },
    {
      image:
      "https://gateway.pinata.cloud/ipfs/Qmb4PbQA3Z1xpcKCnoGdBEwnLZMhGbWQUrWe6TGeAcnLkT",
      name: "HatchyPocket",
      addrs: "0xDeAB5f8794eF5aC21435b3aabeB56001eb551599",
    },
  ],
  "0x4": [
    //Add Your Collections here
    {
      image:
        "https://buni.mypinata.cloud/ipfs/Qmb4PbQA3Z1xpcKCnoGdBEwnLZMhGbWQUrWe6TGeAcnLkT",
      name: "The Buny Project",
      addrs: "0xff6f9c17424fda52f1fb8094201f1a4325ccaa05",
    },
  ],

  "0x1": [
    {
      image:
        "https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s130",
      name: "Crypto Punks",
      addrs: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
    },
    {
      image:
        "https://pbs.twimg.com/media/FRyaL9QVsAIOJAw?format=jpg&name=4096x4096",
      name: "DogeClub",
      addrs: "0xFa964aE80da97e4DBCb63bbcf3bB0fFe92a05Cbd",
    },
  ],
};

export const getCollectionsByChain = (chain) => networkCollections[chain];
