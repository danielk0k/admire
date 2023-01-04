import { GridItem, Text } from "@chakra-ui/react";

function Attribute({ attr }) {
  return (
    <GridItem
      borderWidth={1}
      borderRadius="xl"
      borderColor="#e67e22"
      padding={2}
      paddingLeft={3}
      paddingRight={3}
      textAlign="center"
      color="#e67e22"
      transition="border-color 0.5s, text-color 0.5s"
      _hover={{
        borderColor: "#f39c12",
        textColor: "#f39c12",
      }}
    >
      <Text as="b">{attr.trait_type}</Text>
      <Text>{attr.value}</Text>
    </GridItem>
  );
}

export default Attribute;
