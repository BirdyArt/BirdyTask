import {
  Box,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Login from "./login";
import { useState } from "react";
import Signup from "./signup";

const Auth = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(true);

  const handleShowLoginOrSignup = () => setIsLogin(!isLogin);

  return (
    <>
      <Box pb={2}>
        <Button onClick={onOpen}>Login</Button>
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
