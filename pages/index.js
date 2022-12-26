import Head from "next/head";
import detectEthereumProvider from "@metamask/detect-provider";
import { useState } from "react";
import { Box, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import Thumbnail from "../components/thumbnail";
import sample from "../components/sample";

function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
            console.error(err);
          }
        });
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
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
            <Button
              variant="outline"
              size={{ base: "sm", md: "md", lg: "lg" }}
              onClick={getAccount}
            >
              Connect
            </Button>
          </VStack>
        </GridItem>
        {sample.map((metadata, index) => {
          return (
            <Thumbnail metadata={metadata} isCuration={false} key={index} />
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

export default Home;
