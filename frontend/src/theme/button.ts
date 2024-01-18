import { defineStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const Button = defineStyleConfig({
  variants: {
    dark: (props) => ({
      color: mode("secondary", "primary.900")(props),
      bg: mode("primary.900", "secondary")(props),
      _hover: {
        bg: mode("primary.600", "primary.300")(props),
      },
    }),
    icon: (props) => ({
      color: mode("primary.900", "secondary")(props),
      bg: mode("secondary", "primary.900")(props),
      _hover: {
        bg: mode("primary.300", "primary.600")(props),
      },
    }),
  },
  defaultProps: {
    size: "md",
    variant: "dark",
  },
});
