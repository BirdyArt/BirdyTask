import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue("primary.900", "secondary");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log(errors);

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <>
      <Box pb={2}>
        <Button onClick={onOpen}>Login</Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Please provide your credentials to login.
              <FormControl isInvalid={!!errors.email || !!errors.password}>
                <Input
                  id="email"
                  mt={2}
                  borderColor={errors.email ? "red.500" : color}
                  sx={{
                    "&:focus": {
                      borderColor: errors.email ? "red.500" : color,
                    },
                  }}
                  variant="filled"
                  placeholder="Email"
                  {...register("email", {
                    required: "This is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message?.toString()}
                </FormErrorMessage>
                <Input
                  id="password"
                  mt={2}
                  variant="filled"
                  placeholder="Password"
                  borderColor={errors.password ? "red.500" : color}
                  sx={{
                    "&:focus": {
                      borderColor: errors.password ? "red.500" : color,
                    },
                  }}
                  {...register("password", {
                    required: "This is required",
                    minLength: {
                      value: 8,
                      message: "Password minimum length should be 8",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message?.toString()}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Button isLoading={isSubmitting} type="submit">
                Login
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
