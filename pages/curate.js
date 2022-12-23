import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import alchemy from "../components/alchemy";
import Thumbnail from "../components/thumbnail";

function Curator() {
  const router = useRouter();
  const [NFTs, setNFTs] = useState([]);
  const { account } = router.query;
  if (!account) {
    router.push("/");
    console.error("Missing account. Please connect your MetaMask first!");
  }
  const fetchNFTs = async () => {
    try {
      const nfts = await alchemy.nft.getNftsForOwner(
        "0x6f69DCf34092CA364ff179a504Dc19d876E86eae"
      );
      setNFTs([...nfts.ownedNfts]);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => fetchNFTs, [account]);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      <GridItem colSpan={1}>
        <Box>
          <Heading>Admire</Heading>
          <Text>Click Curate Share</Text>
        </Box>
      </GridItem>
      {NFTs.map((metadata, index) => {
        return <Thumbnail metadata={metadata} key={index} />;
      })}
    </Grid>
  );
}

export default Curator;
