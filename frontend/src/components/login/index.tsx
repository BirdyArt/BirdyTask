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
import { login } from "../../api/auth";
import { axios } from "../../api/axios";
import { getLoggedInUserInfo } from "../../api/users";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue("primary.900", "secondary");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      const { access_token } = await login({
        email: values.email,
        password: values.password,
      });
      axios.defaults.headers.common["Authorization"] = access_token;
      localStorage.setItem("access_token", access_token);
      const user = await getLoggedInUserInfo();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

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
                      value: 4,
                      message: "Password minimum length should be 4",
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
