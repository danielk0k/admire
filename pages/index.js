import Head from "next/head";
import detectEthereumProvider from "@metamask/detect-provider";
import { useState } from "react";
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import Thumbnail from "../components/thumbnail";
import sample from "../components/sample";
import Footer from "../components/footer";

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
            console.log(err);
          }
        });
    } catch (error) {
      console.log(error.message);
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
          <Box>
            <Heading size={{ base: "2xl", lg: "4xl" }}>Admire</Heading>
            <Text fontSize={{ base: "xl", lg: "2xl" }}>Click Curate Share</Text>
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              align="justify"
              paddingTop={4}
            >
              A place for owners to curate their own NFT art gallery from their
              collection, and invite people to admire them from anywhere in the
              world.
            </Text>
          </Box>
          <Button
            variant="outline"
            size={{ base: "sm", md: "md", lg: "lg" }}
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
        <GridItem>
          <Heading size={{ base: "2xl", lg: "4xl" }} textAlign="right">
            1000
          </Heading>
          <Text fontSize={{ base: "xl", lg: "2xl" }} textAlign="right">
            Links Generated
          </Text>
        </GridItem>
      </Grid>
      <Footer />
    </>
  );
}

export default Home;
