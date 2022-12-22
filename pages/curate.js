import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import alchemy from "../components/alchemy";
import Thumbnail from "../components/thumbnail";

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
      alchemy.nft
        .getNftsForOwner("0x6f69DCf34092CA364ff179a504Dc19d876E86eae")
        .then((nfts) => {
          console.log(nfts);
          setNFTs([...nfts.ownedNfts]);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => fetchNFTs, [NFTs]);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      <GridItem rowSpan={2} colSpan={1}>
        <Box>
          <Heading>Admire</Heading>
          <Text>Click Curate Share</Text>
        </Box>
      </GridItem>
      {NFTs.map((nft) => {
        return <Thumbnail metadata={nft} />;
      })}
    </Grid>
  );
}

export default Curator;
