import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Box,
  Text,
  Heading,
  ButtonGroup,
} from "@chakra-ui/react";
import Image from "next/image";

function Card({ metadata, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="xl">{metadata.title}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack gap={20}>
            <Image
              src={
                metadata.media.length === 0
                  ? "https://place-hold.it/300"
                  : metadata.media[0].gateway
              }
              width="400"
              height="400"
            />
            <Box>
              <Text fontSize="xl">{metadata.description}</Text>
              <Text fontSize="lg">Token ID: {metadata.tokenId}</Text>
              <Text fontSize="lg">Token Type: {metadata.tokenType}</Text>
              <Text fontSize="lg">
                Contract Address: {metadata.contract.address}
              </Text>
              <Text>{metadata.rawMetadata.attribute}</Text>
            </Box>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup gap={4}>
            <Button variant="outline">Prev</Button>
            <Button variant="outline">Next</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Card;
