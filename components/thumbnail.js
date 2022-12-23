import { GridItem, Image, useDisclosure } from "@chakra-ui/react";
import Card from "./card";

function Thumbnail({ metadata }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <GridItem colSpan={1}>
      <Image
        src={metadata.media[0].gateway}
        fallbackSrc="https://place-hold.it/800"
        onClick={onOpen}
      />
      <Card metadata={metadata} isOpen={isOpen} onClose={onClose}></Card>
    </GridItem>
  );
}

export default Thumbnail;
