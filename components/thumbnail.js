import { CheckCircleIcon } from "@chakra-ui/icons";
import { GridItem, IconButton, Image, useDisclosure } from "@chakra-ui/react";
import Card from "./card";

function Thumbnail({ metadata, isCuration, handleCuration }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <GridItem colSpan={1}>
      {isCuration ? (
        <IconButton
          variant="outline"
          size="lg"
          colorScheme="green"
          isRound
          position="absolute"
          icon={<CheckCircleIcon />}
          onClick={handleCuration}
          aria-label="Select NFT"
        />
      ) : (
        <></>
      )}
      <Image
        src={metadata.media[0].gateway}
        fallbackSrc="https://place-hold.it/800"
        onClick={onOpen}
        opacity="0.95"
        _hover={{ opacity: "1" }}
      />
      <Card metadata={metadata} isOpen={isOpen} onClose={onClose}></Card>
    </GridItem>
  );
}

export default Thumbnail;
