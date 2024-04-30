import { Box } from "@chakra-ui/react";
import NavBar from "./components/navbar";
import "@fontsource/staatliches";
import Dnd from "./components/dnd";
import { useRecoilValue } from "recoil";
import { userInfoState } from "./state/user-info/UserInfoState";

function App() {
  const userInfo = useRecoilValue(userInfoState);

  return (
    <Box h={window.innerHeight}>
      <NavBar />
      {Object.keys(userInfo).length !== 0 ? <Dnd /> : null}
    </Box>
  );
}

export default App;
