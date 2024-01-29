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
} from "@chakra-ui/react";
import Login from "./login";
import { useEffect, useState } from "react";
import Signup from "./signup";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../state/user-info/UserInfoState";
import { SignOut } from "@phosphor-icons/react";
import { axios } from "../../api/axios";
import { getLoggedInUserInfo } from "../../api/users";
import { useForm } from "react-hook-form";

const Auth = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const toast = useToast();
  const { reset } = useForm();

  const { firstName, lastName } = userInfo;

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("access_token")) {
        try {
          axios.defaults.headers.common["Authorization"] =
            localStorage.getItem("access_token");
          const user = await getLoggedInUserInfo();
          setUserInfo(user);
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
  };

  return (
    <>
      <Box pb={2}>
        {firstName && lastName ? (
          <Menu>
            <MenuButton as={Button}>Profile</MenuButton>
            <MenuList>
              <MenuGroup title={`Hi ${firstName} ${lastName}!`}>
                <MenuItem
                  icon={<Icon fontSize={24} weight="bold" as={SignOut} />}
                  onClick={handleLogout}
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
        <ModalContent>
          {isLogin ? (
            <Login
              onClose={onClose}
              handleShowLoginOrSignup={handleShowLoginOrSignup}
            />
          ) : (
            <Signup
              onClose={onClose}
              handleShowLoginOrSignup={handleShowLoginOrSignup}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Auth;
