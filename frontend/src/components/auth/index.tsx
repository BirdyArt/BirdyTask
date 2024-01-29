import {
  Box,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Login from "./login";

const Auth = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box pb={2}>
        <Button onClick={onOpen}>Login</Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Login onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Auth;
