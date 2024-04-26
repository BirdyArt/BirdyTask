import {
  Box,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Icon,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import Login from "./login";
import { useEffect, useState } from "react";
import Signup from "./signup";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../state/user-info/UserInfoState";
import { SignOut } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { client } from "../../api/birdy-task-api";

const Auth = ({ setIsOpen }: { setIsOpen?: (value: boolean) => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const color = useColorModeValue("secondary", "primary.900");
  const colorHover = useColorModeValue("primary.300", "primary.800");
  const toast = useToast();
  const { reset } = useForm();
  const { firstName, lastName } = userInfo;

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("access_token")) {
        try {
          client.defaults.headers.common["Authorization"] =
            localStorage.getItem("access_token");
          const user = await client.getMe();
          setUserInfo(user.data);
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

  const handleShowLoginOrSignup = () => {
    reset();
    setIsLogin(!isLogin);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUserInfo({});
    setIsOpen && setIsOpen(false);
  };

  return (
    <>
      <Box pb={2}>
        {firstName && lastName ? (
          <Menu placement="bottom">
            <MenuButton as={Button}>Profile</MenuButton>
            <MenuList backgroundColor={color}>
              <MenuGroup title={`Hi ${firstName} ${lastName}!`}>
                <MenuItem
                  icon={<Icon fontSize={24} weight="bold" as={SignOut} />}
                  onClick={handleLogout}
                  backgroundColor={color}
                  sx={{
                    "&:hover": {
                      backgroundColor: colorHover,
                    },
                  }}
                >
                  Logout
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        ) : (
          <Button onClick={onOpen}>Login</Button>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={2}>
          {isLogin ? (
            <Login
              onClose={onClose}
              handleShowLoginOrSignup={handleShowLoginOrSignup}
              setIsOpen={setIsOpen}
            />
          ) : (
            <Signup
              onClose={onClose}
              handleShowLoginOrSignup={handleShowLoginOrSignup}
              setIsOpen={setIsOpen}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Auth;
