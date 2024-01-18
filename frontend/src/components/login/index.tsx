import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size="md"
        rounded="md"
        color="secondary"
        bg="primary.900"
        _hover={{
          bg: "primary.600",
        }}
        onClick={onOpen}
      >
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Please login</ModalBody>

          <ModalFooter>
            <Button
              size="md"
              rounded="md"
              color="secondary"
              bg="primary.900"
              _hover={{
                bg: "primary.600",
              }}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button variant="ghost">Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
