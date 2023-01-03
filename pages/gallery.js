import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import Thumbnail from "../components/thumbnail";
import supabase from "../components/supabase";
import Footer from "../components/footer";

function Gallery() {
  const router = useRouter();
  const [metadata, setMetadata] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = router.query;

  useEffect(() => {
    async function fetchNFTs() {
      try {
        if (!router.isReady) return;
        if (!id) {
          throw new Error("Missing id. Please try again.");
        }
        const { data, error } = await supabase
          .from("gallery_links")
          .select()
          .eq("id", id);
        if (error) {
          throw error;
        }
        const parsedData = JSON.parse(data[0].data);
        setTitle(parsedData.title);
        setDescription(parsedData.description);
        setMetadata(parsedData.data);
      } catch (error) {
        console.log(error.message);
        router.push("/");
      }
    }
    fetchNFTs();
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Admire</title>
        <meta name="Admire" content="Curate and share your NFT art gallery." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {id ? (
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
              <Text fontSize={{ base: "xl", lg: "2xl" }}>{title}</Text>
              <Text
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                align="justify"
                paddingTop={4}
              >
                {description}
              </Text>
            </Box>
          </GridItem>
          {metadata.map((metadata, index) => {
            return (
              <Thumbnail metadata={metadata} isCuration={false} key={index} />
            );
          })}
        </Grid>
      ) : (
        <></>
      )}
      <Footer />
    </>
  );
}

export default Gallery;
