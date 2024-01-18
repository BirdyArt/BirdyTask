import { Box } from "@chakra-ui/react";
import NavBar from "./components/navbar";
import "@fontsource/staatliches";

function App() {
  return (
    <Box bg="secondary" h={window.innerHeight}>
      <NavBar />
    </Box>
  );
}

export default App;
