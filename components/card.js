import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Heading,
  ButtonGroup,
  Image,
  IconButton,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
import { useState } from "react";

function Card({ metadata, isOpen, onClose, isCuration, handleCuration }) {
  const [isSelected, setIsSelected] = useState(false);
  const isImgAvail =
    metadata.media && metadata.media.length === 1 && metadata.media[0].gateway;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="xl">{metadata.title}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns={{ base: "", md: "repeat(2, 1fr)" }} gap={10}>
            <GridItem>
              <Image
                src={isImgAvail ? metadata.media[0].gateway : ""}
                fallbackSrc="https://place-hold.it/800"
              />
            </GridItem>
            <GridItem>
              <Text fontSize="xl">{metadata.description}</Text>
              <Text fontSize="lg">Token ID: {metadata.tokenId}</Text>
              <Text fontSize="lg">Token Type: {metadata.tokenType}</Text>
              <Text fontSize="lg">
                Contract Address: {metadata.contract.address}
              </Text>
              {/* <Text>{metadata.rawMetadata.attributes}</Text> */}
            </GridItem>
          </Grid>
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
            <IconButton
              variant="outline"
              size="md"
              colorScheme="yellow"
              icon={<ArrowBackIcon />}
            />
            <IconButton
              variant="outline"
              size="md"
              colorScheme="orange"
              icon={<ArrowForwardIcon />}
            />
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Card;
