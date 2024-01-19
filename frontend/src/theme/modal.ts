import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { modalAnatomy as parts } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  dialog: {
    bg: "secondary",
    _dark: {
      bg: "primary.900",
    },
  },
});

export const Modal = defineMultiStyleConfig({
  baseStyle,
});
