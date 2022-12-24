import { extendTheme } from "@chakra-ui/react";
import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  dialog: {
    borderRadius: "20px",
    background: "#090d10",
    padding: "10px",
  },
});

const modalTheme = defineMultiStyleConfig({
  baseStyle,
});

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: {
    "html, body": {
      background: "#090d10",
    },
  },
};

const theme = extendTheme({
  config,
  styles,
  components: { Modal: modalTheme },
});

export default theme;
