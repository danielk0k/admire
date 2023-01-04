import { Text } from "@chakra-ui/react";

function Attribute({ attr }) {
  return (
    <Text
      as="b"
      color="#2ecc71"
      borderWidth={1}
      borderRadius="full"
      borderColor="#2ecc71"
      padding={2}
      paddingLeft={3}
      paddingRight={3}
      marginRight={6}
      textAlign="center"
      transition="background-color 0.5s, text-color 0.5s"
      _hover={{
        backgroundColor: "#2ecc71",
        textColor: "#ffffff",
      }}
    >
      {attr.trait_type}
    </Text>
  );
}

export default Attribute;
