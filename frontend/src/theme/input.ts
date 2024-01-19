import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  field: {
    borderColor: "primary.900",
    _focus: {
      borderColor: "primary.600 !important",
    },
    _dark: {
      borderColor: "primary.300",
      _focus: {
        borderColor: "secondary !important",
      },
    },
  },
});

export const Input = defineMultiStyleConfig({ baseStyle });
