import { Box } from "@chakra-ui/react";
import NavBar from "./components/navbar";
import "@fontsource/staatliches";
import Dnd from "./components/dnd";

function App() {
  return (
    <Box h={window.innerHeight}>
      <NavBar />
      <Dnd />
    </Box>
  );
}

export default App;
