import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/layout";
import alchemy from "../components/alchemy";
import Thumbnail from "../components/thumbnail";
import Head from "next/head";

function Curator() {
  const router = useRouter();
  const [NFTs, setNFTs] = useState([]);
  const [curation, setCuration] = useState([]);
  const { account } = router.query;

  const handleCuration = (index) => {
    curation[index] = !curation[index];
  };

  const fetchNFTs = async () => {
    try {
      if (!account) {
        router.push("/");
        throw new Error("Missing account. Please connect your MetaMask first!");
      }

      const nfts = await alchemy.nft.getNftsForOwner(
        "0xd02Cf0BFae434D95E634F7A303452b85e14b65a9"
      );
      setNFTs([...nfts.ownedNfts]);
      setCuration([...nfts.ownedNfts].fill(false));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => fetchNFTs, [account]);

  return (
    <>
      <Head>
        <title>Admire</title>
        <meta name="Admire" content="Curate and share your NFT art gallery." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        templateColumns={{
          base: "",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
        margin="2rem"
        as="main"
      >
        <GridItem colSpan={1}>
          <VStack gap={6}>
            <Box>
              <Heading size={{ base: "2xl", lg: "4xl" }}>Admire</Heading>
              <Text fontSize={{ base: "xl", lg: "3xl" }}>
                Click Curate Share
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                align="justify"
                paddingTop={4}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </Text>
            </Box>
          </VStack>
        </GridItem>
        {NFTs.map((metadata, index) => {
          return (
            <Thumbnail
              metadata={metadata}
              isCuration={true}
              handleCuration={() => handleCuration(index)}
              key={index}
            />
          );
        })}
      </Grid>
      <VStack as="footer" paddingTop={20}>
        <Heading size="md">Admire</Heading>
        <Text fontSize="sm">Click Curate Share</Text>
      </VStack>
    </>
  );
}

export default Curator;
