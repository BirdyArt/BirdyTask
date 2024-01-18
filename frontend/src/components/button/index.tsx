import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  variants: {
    dark: {
      color: "secondary",
      bg: "primary.900",
      _hover: {
        bg: "primary.600",
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "dark",
  },
});
