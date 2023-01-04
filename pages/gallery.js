import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/layout";
import Thumbnail from "../components/thumbnail";
import supabase from "../components/supabase";
import Footer from "../components/footer";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { TwitterIcon } from "../components/icons";

function Gallery() {
  const router = useRouter();
  const [metadata, setMetadata] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id, showModal } = router.query;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
  };

  useEffect(() => {
    async function fetchNFTs() {
      try {
        if (!router.isReady) return;
        if (!id) {
          throw new Error("Missing id. Please try again.");
        }
        if (showModal) {
          setLink(`${window.location.origin}/gallery?id=${id}`);
          onOpen();
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "md", md: "4xl" }}
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">Congratulations!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="left" spacing={4}>
              <Text fontSize={{ md: "lg" }}>
                Your gallery link has been successfully created. Share your
                gallery via{" "}
                <Link
                  href={`https://twitter.com/intent/tweet?text=Check%20out%20the%20NFT%20gallery%20I%20just%20created%20on%20Admire%F0%9F%8C%9F%20at%20${link}`}
                  isExternal
                >
                  Twitter <TwitterIcon />
                </Link>{" "}
                or copy the link as it will only be shown once.
              </Text>
              <HStack
                borderWidth={1}
                borderColor="white"
                borderRadius={10}
                padding={2}
              >
                <Link href={link} width="95%" isExternal>
                  <Text fontSize={{ md: "lg" }} as="b">
                    {link}
                  </Text>
                </Link>
                <IconButton
                  aria-label="Copy link"
                  width="5%"
                  icon={<CopyIcon />}
                  onClick={handleCopy}
                  variant="solid"
                />
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
