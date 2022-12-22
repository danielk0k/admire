import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { alchemy } from "../components/alchemy";
import { Grid, GridItem } from "@chakra-ui/layout";

function Curator() {
  const router = useRouter();
  const [NFTs, setNFTs] = useState([]);

  const fetchNFTs = async () => {
    try {
      const { account } = router.query;
      if (!account) {
        router.push("/");
        throw new Error("Missing account. Please connect your MetaMask first!");
      }
      const nfts = await alchemy.nft.getNftsForOwner(account); // norde.eth
      setNFTs([...nfts.ownedNfts]);
      console.log(NFTs);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => fetchNFTs);

  return (
    <Grid
      templateRows="repeat(4, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={1} bg="tomato" />
      <GridItem colSpan={1} bg="papayawhip" />
      <GridItem colSpan={1} bg="papayawhip" />
    </Grid>
  );
}

export default Curator;
