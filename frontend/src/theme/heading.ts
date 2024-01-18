import { defineStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const Heading = defineStyleConfig({
  variants: {
    default: (props) => ({
      color: mode("primary.900", "secondary")(props),
    }),
  },
  defaultProps: {
    variant: "default",
  },
});
