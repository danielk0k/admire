import Head from "next/head";
import detectEthereumProvider from "@metamask/detect-provider";
import { useState } from "react";
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import Thumbnail from "../components/thumbnail";
import sample from "../components/sample";

function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAccountsChanged = (accounts) => {
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
        .then(handleAccountsChanged)
        .catch((err) => {
          if (err.code === 4001) {
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
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
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1}>
          <Box>
            <Heading>Admire</Heading>
            <Text>Click Curate Share</Text>
            <Button onClick={getAccount}>Connect</Button>
          </Box>
        </GridItem>
        {sample.map((metadata, index) => {
          return <Thumbnail metadata={metadata} key={index} />;
        })}
      </Grid>
    </>
  );
}

export default Home;
