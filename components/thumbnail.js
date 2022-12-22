import { GridItem, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import Card from "./card";

function Thumbnail({ metadata }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <GridItem colSpan={1}>
      <Image
        src={
          metadata.media.length === 0
            ? "https://place-hold.it/300"
            : metadata.media[0].gateway
        }
        onClick={onOpen}
        width="400"
        height="400"
      />
      <Card metadata={metadata} isOpen={isOpen} onClose={onClose}></Card>
    </GridItem>
  );
}

export default Thumbnail;
