import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import alchemy from "../components/alchemy";
import supabase from "../components/supabase";
import { nanoid } from "nanoid";
import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import Thumbnail from "../components/thumbnail";
import Footer from "../components/footer";

function Curator() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [NFTs, setNFTs] = useState([]);
  const [curation, setCuration] = useState([]);
  const [curationNum, setCurationNum] = useState(0);
  const [title, setTitle] = useState("HODL");
  const [description, setDescription] = useState("I am rich");
  const isTitleErr = title === "";
  const isDescriptionErr = description === "";
  const { account } = router.query;

  const handleCuration = (index) => {
    curation[index] = !curation[index];
  };

  const handleCurationNum = () => {
    setCurationNum(curation.reduce((acc, curr) => (curr ? acc + 1 : acc), 0));
  };

  const uploadCuration = async () => {
    try {
      setIsLoading(true);
      if (isTitleErr || isDescriptionErr) {
        throw new Error("All fields must be filled.");
      }
      const id = nanoid(10);
      const selectedNFTs = [];
      for (let i = 0; i < NFTs.length; i++) {
        if (curation[i]) {
          selectedNFTs.push(NFTs[i]);
        }
      }
      const { error } = await supabase.from("gallery_links").insert({
        id: id,
        created_at: new Date(),
        data: JSON.stringify({
          title: title,
          description: description,
          data: selectedNFTs,
        }),
      });
      if (error) {
        throw error;
      }
      router.push(
        {
          pathname: "/success",
          query: { id: id },
        },
        "/success"
      );
    } catch (error) {
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
            "Missing account. Please connect your MetaMask first!"
          );
        }
        const nfts = await alchemy.nft.getNftsForOwner(
          "0x47BB52804C5d8Ea1a4969e3DF4bc49ee1ED6f070"
        );
        setNFTs([...nfts.ownedNfts]);
        setCuration([...nfts.ownedNfts].fill(false));
      } catch (error) {
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
            <VStack spacing={4}>
              <FormControl isRequired isInvalid={isTitleErr}>
                <FormLabel fontSize="xl">Title</FormLabel>
                <Input
                  type="text"
                  variant="outline"
                  borderColor="white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {isTitleErr ? (
                  <FormErrorMessage>Title is required.</FormErrorMessage>
                ) : (
                  <></>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={isDescriptionErr}>
                <FormLabel fontSize="xl">Description</FormLabel>
                <Textarea
                  type="text"
                  variant="outline"
                  borderColor="white"
                  maxHeight="1"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {isDescriptionErr ? (
                  <FormErrorMessage>Description is required.</FormErrorMessage>
                ) : (
                  <></>
                )}
              </FormControl>
              <Button
                width="100%"
                variant="outline"
                colorScheme="cyan"
                isLoading={isLoading}
                loadingText="Creating"
                spinnerPlacement="end"
                onClick={uploadCuration}
              >
                Create
              </Button>
            </VStack>
          </Box>
        </GridItem>
        {NFTs.map((metadata, index) => {
          return (
            <Thumbnail
              metadata={metadata}
              isCuration={true}
              handleCuration={() => {
                handleCuration(index);
                handleCurationNum();
              }}
              key={index}
            />
          );
        })}
      </Grid>
      <Center>
        <Box
          position="fixed"
          bottom="0"
          width={{ base: "sm", md: "2xl", lg: "6xl" }}
          borderRadius={20}
          backgroundColor="white"
        >
          <Heading color="black" size="md" textAlign="center">
            {curationNum} NFT{curationNum > 1 ? "s" : ""} selected
          </Heading>
        </Box>
      </Center>
      <Footer />
    </>
  );
}

export default Curator;
