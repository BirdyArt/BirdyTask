import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Staatliches",
    body: "Staatliches",
  },
  colors: {
    primary: {
      100: "#EAEAEA",
      200: "#C0C0C0",
      300: "#ABABAB",
      400: "#969696",
      500: "#818181",
      600: "#6C6C6C",
      700: "#575757",
      800: "#424242",
      900: "#2E2E2E",
    },
    secondary: "#F3F3F3",
  },
});

export default theme;
