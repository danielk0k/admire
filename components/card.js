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
} from "@chakra-ui/react";
import Image from "next/image";

function Card({ metadata, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{metadata.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>
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
              <Text>{metadata.description}</Text>
              <Text>{metadata.tokenId}</Text>
              <Text>{metadata.tokenType}</Text>
              <Text>{metadata.contract.address}</Text>
              <Text>{metadata.rawMetadata.attribute}</Text>
            </Box>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Card;
