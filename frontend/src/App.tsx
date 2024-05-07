import { Box, useToast } from "@chakra-ui/react";
import NavBar from "./components/navbar";
import "@fontsource/staatliches";
import { useRecoilState } from "recoil";
import { userInfoState } from "./state/user-info/UserInfoState";
import { useEffect } from "react";
import { client } from "./api/birdy-task-api";
import TaskBoard from "./components/taskboard";

function App() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("access_token")) {
        try {
          client.defaults.headers.common["Authorization"] =
            localStorage.getItem("access_token");
          const { data } = await client.getMe();
          setUserInfo(data);
        } catch (error) {
          toast({
            title: "Unknown error occurred.",
            description: "Please try again later.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } else {
        setUserInfo({});
      }
    })();
  }, []);

  return (
    <Box h={window.innerHeight}>
      <NavBar />
      {Object.keys(userInfo).length !== 0 ? <TaskBoard /> : null}
    </Box>
  );
}

export default App;
