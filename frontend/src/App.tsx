import { Box, Heading, useToast, Text } from "@chakra-ui/react";
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
        } catch (error: any) {
          switch (error.response.status) {
            case 401:
              localStorage.removeItem("access_token");
              break;
            default:
              toast({
                title: "Unknown error occurred.",
                description: "Please try again later.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              break;
          }
        }
      } else {
        setUserInfo({});
      }
    })();
  }, []);

  return (
    <Box h={window.innerHeight}>
      <NavBar />
      {Object.keys(userInfo).length !== 0 ? (
        <TaskBoard />
      ) : (
        <Box
          display="flex"
          height="calc(100% - 244px)"
          flexDirection={"column"}
          justifyContent={"center"}
          mx={4}
        >
          <Heading fontSize={36} textAlign={"center"}>
            Welcome to BirdyTask!
          </Heading>
          <Text fontSize={24} textAlign={"center"}>
            Please login or signup to continue
          </Text>
          <Text fontSize={18} textAlign={"center"}>
            ( if you just want to see how it works, please select "test it"
            option in login dialog )
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default App;
