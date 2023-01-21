import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, GridItem, Image, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import Card from "./card";

function Thumbnail({ metadata, isCuration, handleCuration }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSelected, setIsSelected] = useState(false);
  const isImgAvail =
    metadata.media && metadata.media.length === 1 && metadata.media[0].gateway;
  return (
    <GridItem colSpan={1}>
      {isSelected ? (
        <CheckCircleIcon
          color="white"
          position="absolute"
          zIndex="overlay"
          boxSize="8"
          margin={4}
        />
      ) : (
        <></>
      )}
      <Image
        src={isImgAvail ? metadata.media[0].gateway : ""}
        fallbackSrc="https://place-hold.it/800"
        onClick={onOpen}
        opacity={isSelected ? "0.7" : "0.95"}
        _hover={isSelected ? { opacity: "0.7" } : { opacity: "1" }}
      />
      <Card
        metadata={metadata}
        isOpen={isOpen}
        onClose={onClose}
        isCuration={isCuration}
        handleCuration={() => {
          setIsSelected(!isSelected);
          handleCuration();
        }}
      ></Card>
    </GridItem>
  );
}

export default Thumbnail;
