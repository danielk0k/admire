import { ArrowUpIcon } from "@chakra-ui/icons";
import { VStack } from "@chakra-ui/react";

function Footer() {
  return (
    <VStack>
      <ArrowUpIcon
        boxSize={10}
        margin="20 0 20 0"
        rounded="full"
        borderWidth={2}
        borderColor="white"
        cursor="pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </VStack>
  );
}

export default Footer;
