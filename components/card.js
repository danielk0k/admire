import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  ButtonGroup,
  Image,
  IconButton,
  Grid,
  Stack,
  VStack,
  Link,
  Button,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Attribute from "./attribute";

function Card({ metadata, isOpen, onClose, isCuration, handleCuration }) {
  const [isSelected, setIsSelected] = useState(false);
  const isImgAvail =
    metadata.media && metadata.media.length > 0 && metadata.media[0].gateway;
  const isAttrAvail =
    metadata.rawMetadata &&
    metadata.rawMetadata.attributes &&
    metadata.rawMetadata.attributes.length > 0;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xl", md: "4xl", lg: "6xl" }}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl">{metadata.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction={{ base: "column", md: "row" }} spacing={8}>
            <Image
              src={isImgAvail ? metadata.media[0].gateway : ""}
              fallbackSrc="https://place-hold.it/800"
              width={{ base: "100%", md: "50%" }}
            />
            <VStack
              width={{ base: "100%", md: "50%" }}
              align="left"
              spacing={4}
              lineHeight={2}
            >
              {metadata.description ? (
                <Text fontSize="lg">
                  <Text as="b">Description: </Text>
                  {metadata.description}
                </Text>
              ) : (
                <></>
              )}
              {metadata.tokenId ? (
                <Text fontSize="lg">
                  <Text as="b">Token ID: </Text>
                  {metadata.tokenId}
                </Text>
              ) : (
                <></>
              )}
              {metadata.tokenType ? (
                <Text fontSize="lg">
                  <Text as="b">Token Type: </Text>
                  {metadata.tokenType}
                </Text>
              ) : (
                <></>
              )}
              {metadata.contract.address ? (
                <Text fontSize="lg">
                  <Text as="b">Contract Address: </Text>
                  <Link
                    href={`https://etherscan.io/address/${metadata.contract.address}`}
                    isExternal
                  >
                    {metadata.contract.address}
                  </Link>
                </Text>
              ) : (
                <></>
              )}
              {isAttrAvail ? (
                <>
                  <Text fontSize="lg" as="b">
                    Attributes:
                  </Text>
                  <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    {metadata.rawMetadata.attributes.map((attr, index) => (
                      <Attribute attr={attr} key={index} />
                    ))}
                  </Grid>
                </>
              ) : (
                <></>
              )}
            </VStack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup gap={4}>
            {isCuration ? (
              <IconButton
                variant="outline"
                size="md"
                colorScheme={isSelected ? "green" : "gray"}
                icon={<CheckCircleIcon />}
                onClick={() => {
                  setIsSelected(!isSelected);
                  onClose();
                  handleCuration();
                }}
                aria-label="Select NFT"
              />
            ) : (
              <></>
            )}
            <Button onClick={onClose}>Close</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Card;
