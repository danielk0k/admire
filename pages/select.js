import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import alchemy from "../components/alchemy";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/layout";
import { Button, ButtonGroup, useToast } from "@chakra-ui/react";
import Thumbnail from "../components/thumbnail";
import Footer from "../components/footer";

function Curator() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [NFTs, setNFTs] = useState([]);
  const [curation, setCuration] = useState([]);
  const [curationNum, setCurationNum] = useState(0);
  const { account } = router.query;
  const toast = useToast();

  const handleSelection = (index) => {
    curation[index] = !curation[index];
  };

  const handleSelectionNum = () => {
    setCurationNum(curation.reduce((acc, curr) => (curr ? acc + 1 : acc), 0));
  };

  const handleNext = () => {
    try {
      setIsLoading(true);
      const selectedNFTs = [];
      for (let i = 0; i < NFTs.length; i++) {
        if (curation[i]) {
          selectedNFTs.push(NFTs[i]);
        }
      }
      if (selectedNFTs.length < 1) {
        throw new Error("You have not selected any NFTs. Please try again.");
      }
      router.push(
        {
          pathname: "/curate",
          query: {
            accountAddr: account,
            selectedNFTs: JSON.stringify(selectedNFTs),
          },
        },
        "/curate"
      );
    } catch (error) {
      toast({
        title: "Please try again.",
        description: "You have not selected any NFTs.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchNFTs() {
      try {
        if (!account) {
          throw new Error(
            "Missing account. Please connect your MetaMask first."
          );
        }
        const nfts = await alchemy.nft.getNftsForOwner(
          "0xaBa43b424C51886C6946dD7E1322E8a1A52C5f36"
        );
        setNFTs([...nfts.ownedNfts]);
        setCuration([...nfts.ownedNfts].fill(false));
      } catch (error) {
        toast({
          title: "Missing account.",
          description: "Please connect your MetaMask first.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        console.log(error.message);
        router.push("/");
      }
    }
    fetchNFTs();
  }, [account]);

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
          <Box>
            <Heading size={{ base: "2xl", lg: "4xl" }}>Admire</Heading>
            <Link href={`https://etherscan.io/address/${account}`} isExternal>
              <Text fontSize={{ base: "xl", lg: "2xl" }}>
                {account
                  ? account.substring(0, 12) + "..." + account.substring(32, 42)
                  : ""}
              </Text>
            </Link>
            <Text fontSize="lg" marginTop={4}>
              {NFTs && NFTs.length > 1
                ? `Wow you own ${NFTs.length} NFTs! `
                : ""}
              It is time to build your own NFT gallery.
            </Text>
            <UnorderedList spacing={2} fontSize="lg" marginY={4}>
              <ListItem>
                Select the NFTs you want to be in your gallery
              </ListItem>
              <ListItem>
                When you're ready, click next to customise your gallery
              </ListItem>
              <ListItem>
                Don't worry if some images do not show up properly, give them
                some time to load.
              </ListItem>
            </UnorderedList>
            <ButtonGroup
              variant="outline"
              spacing={4}
              width="100%"
              marginTop={4}
            >
              <Button
                width="50%"
                colorScheme="green"
                spinnerPlacement="end"
                onClick={() => router.push({ pathname: "/" })}
              >
                Back
              </Button>
              <Button
                width="50%"
                colorScheme="cyan"
                isLoading={isLoading}
                loadingText="Loading"
                spinnerPlacement="end"
                onClick={handleNext}
              >
                Next
              </Button>
            </ButtonGroup>
          </Box>
        </GridItem>
        {NFTs.map((metadata, index) => {
          return (
            <Thumbnail
              metadata={metadata}
              isCuration={true}
              handleCuration={() => {
                handleSelection(index);
                handleSelectionNum();
              }}
              key={index}
            />
          );
        })}
      </Grid>
      <Box
        position="fixed"
        display="flex"
        bottom="5"
        right="5"
        minHeight={14}
        minWidth={14}
        borderRadius="50%"
        backgroundColor="white"
        textColor="black"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Heading>{curationNum}</Heading>
      </Box>
      <Footer />
    </>
  );
}

export default Curator;
