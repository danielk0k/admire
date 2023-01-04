import Head from "next/head";
import detectEthereumProvider from "@metamask/detect-provider";
import { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import Thumbnail from "../components/thumbnail";
import sample from "../components/sample";
import Footer from "../components/footer";

function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAccounts = (accounts) => {
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask.");
    } else {
      router.push(
        {
          pathname: "/curate",
          query: { account: accounts[0] },
        },
        "/curate"
      );
    }
  };

  const getAccount = async () => {
    try {
      setIsLoading(true);
      const provider = await detectEthereumProvider();
      if (!provider || provider !== window.ethereum) {
        throw new Error("Please install MetaMask!");
      }
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleAccounts)
        .catch((err) => {
          if (err.code === 4001) {
            console.log("Please connect to MetaMask.");
          } else {
            console.log(err);
          }
        });
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Admire</title>
        <meta name="title" content="Admire" />
        <meta
          name="description"
          content="Curate and share your NFT gallery in 3 simple steps."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://admireme.vercel.app/" />
        <meta property="og:title" content="Admire" />
        <meta
          property="og:description"
          content="Curate and share your NFT gallery in 3 simple steps."
        />
        <meta property="og:image" content="/images/preview.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://admireme.vercel.app/" />
        <meta property="twitter:title" content="Admire" />
        <meta
          property="twitter:description"
          content="Curate and share your NFT gallery in 3 simple steps."
        />
        <meta property="twitter:image" content="/images/preview.png" />
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
            <Text fontSize={{ base: "xl", lg: "2xl" }}>Click Curate Share</Text>
            <Text
              fontSize="lg"
              align="justify"
              paddingTop={8}
              paddingBottom={4}
            >
              Curate your very own NFT gallery in 3 easy steps:
            </Text>
            <OrderedList spacing={4} fontSize="lg">
              <ListItem>Connect your MetaMask wallet</ListItem>
              <ListItem>Select your NFTs and customise your gallery</ListItem>
              <ListItem>Generate the link and start sharing</ListItem>
            </OrderedList>
          </Box>
          <Button
            variant="outline"
            colorScheme="cyan"
            size={{ base: "sm", md: "md", lg: "lg" }}
            marginTop="8"
            isLoading={isLoading}
            loadingText="Connecting"
            spinnerPlacement="end"
            onClick={getAccount}
          >
            Connect MetaMask
          </Button>
        </GridItem>
        {sample.map((metadata, index) => {
          return (
            <Thumbnail metadata={metadata} isCuration={false} key={index} />
          );
        })}
      </Grid>
      <Footer />
    </>
  );
}

export default Home;
