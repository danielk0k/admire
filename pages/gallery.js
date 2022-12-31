import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/layout";
import Thumbnail from "../components/thumbnail";
import supabase from "../components/supabase";

function Gallery() {
  const router = useRouter();
  const { id } = router.query;
  const [metadata, setMetadata] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchNFTs() {
      try {
        if (!id) {
          router.push("/");
          throw new Error("Missing id. Please try again.");
        }

        const { data, error } = await supabase
          .from("gallery_links")
          .select()
          .eq("id", id);
        if (error) {
          throw error;
        }
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchNFTs();
  }, [id]);

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
              <Text fontSize={{ base: "xl", lg: "2xl" }}>
                Click Curate Share
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                align="justify"
                paddingTop={4}
              >
                A place for owners to curate their own NFT art gallery from
                their collection, and invite people to admire them from anywhere
                in the world.
              </Text>
            </Box>
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

export default Gallery;
