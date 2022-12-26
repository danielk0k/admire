import { GridItem, Image, useDisclosure } from "@chakra-ui/react";
import Card from "./card";

function Thumbnail({ metadata, isCuration, handleCuration }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <GridItem colSpan={1}>
      <Image
        src={metadata.media[0].gateway}
        fallbackSrc="https://place-hold.it/800"
        onClick={onOpen}
        opacity="0.95"
        _hover={{ opacity: "1" }}
      />
      <Card
        metadata={metadata}
        isOpen={isOpen}
        onClose={onClose}
        isCuration={isCuration}
        handleCuration={handleCuration}
      ></Card>
    </GridItem>
  );
}

export default Thumbnail;
