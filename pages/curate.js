import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import supabase from "../components/supabase";
import { nanoid } from "nanoid";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/layout";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Thumbnail from "../components/thumbnail";
import Footer from "../components/footer";
import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";

function Curator() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [NFTs, setNFTs] = useState([]);
  const [account, setAccount] = useState("");
  const [title, setTitle] = useState("HODL");
  const [description, setDescription] = useState("I am rich");
  const isTitleErr = title === "";
  const isDescriptionErr = description === "";
  const { accountAddr, selectedNFTs } = router.query;
  const toast = useToast();

  const mobileView = window.matchMedia("(max-width: 62em)");
  mobileView.addEventListener("change", (e) => setIsMobileView(e.matches));

  const uploadCuration = async () => {
    try {
      setIsLoading(true);
      if (isTitleErr || isDescriptionErr) {
        throw new Error("All fields must be filled.");
      }
      const id = nanoid(10);
      const { error } = await supabase.from("gallery_links").insert({
        id: id,
        created_at: new Date(),
        data: JSON.stringify({
          title: title,
          description: description,
          data: NFTs,
        }),
      });
      if (error) {
        throw error;
      }
      router.push(
        {
          pathname: "/gallery",
          query: { id: id, showModal: true },
        },
        "/gallery"
      );
    } catch (error) {
      toast({
        title: "Please try again.",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) {
      return; // Do nothing
    }
    // Swap elements in list.
    const sourceElem = NFTs[source.index];
    const destElem = NFTs[destination.index];
    NFTs.splice(source.index, 1, destElem);
    NFTs.splice(destination.index, 1, sourceElem);
  };

  useEffect(() => {
    function fetchNFTs() {
      try {
        if (!accountAddr) {
          throw new Error("No account found.");
        }
        if (!selectedNFTs) {
          throw new Error("No selected NFTs found.");
        }
        setAccount(accountAddr);
        setNFTs([...JSON.parse(selectedNFTs)]);
      } catch (error) {
        console.log(error.message);
        router.push("/");
      }
    }
    fetchNFTs();
  }, [accountAddr, selectedNFTs]);

  return (
    <>
      <Head>
        <title>Admire</title>
        <meta name="Admire" content="Curate and share your NFT art gallery." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable
          droppableId="droppableList"
          direction={isMobileView ? "vertical" : "horizontal"}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
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
                    <Link
                      href={`https://etherscan.io/address/${account}`}
                      isExternal
                    >
                      <Text fontSize={{ base: "xl", lg: "2xl" }}>
                        {account
                          ? account.substring(0, 12) +
                            "..." +
                            account.substring(32, 42)
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
                          <FormErrorMessage>
                            Title is required.
                          </FormErrorMessage>
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
                          <FormErrorMessage>
                            Description is required.
                          </FormErrorMessage>
                        ) : (
                          <></>
                        )}
                      </FormControl>
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
                          onClick={() =>
                            router.push(
                              {
                                pathname: "/select",
                                query: { account: account },
                              },
                              "/select"
                            )
                          }
                        >
                          Back
                        </Button>
                        <Button
                          width="50%"
                          variant="outline"
                          colorScheme="cyan"
                          isLoading={isLoading}
                          loadingText="Loading"
                          spinnerPlacement="end"
                          onClick={uploadCuration}
                        >
                          Done
                        </Button>
                      </ButtonGroup>
                    </VStack>
                  </Box>
                </GridItem>
                {NFTs.map((metadata, index) => (
                  <Draggable
                    draggableId={`${index}`}
                    index={index}
                    key={`${index}`}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Thumbnail
                          metadata={metadata}
                          isCuration={false}
                          handleCuration={() => {
                            handleCuration(index);
                            handleCurationNum();
                          }}
                          key={index}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </Grid>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Footer />
    </>
  );
}

export default Curator;
