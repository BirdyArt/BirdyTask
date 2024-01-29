import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { login } from "../../api/auth";
import { axios } from "../../api/axios";
import { getLoggedInUserInfo } from "../../api/users";
import { useState } from "react";
import { Eye, EyeClosed } from "@phosphor-icons/react";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const toast = useToast();
  const color = useColorModeValue("primary.900", "secondary");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleClick = () => setShow(!show);

  const onSubmit = async (values: any) => {
    try {
      const { access_token } = await login({
        email: values.email,
        password: values.password,
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      localStorage.setItem("access_token", `Bearer ${access_token}`);
      const user = await getLoggedInUserInfo();
      console.log(user);
      onClose();
    } catch (error: any) {
      switch (error.response.status) {
        case 401:
          toast({
            title: "Incorrect email or password.",
            position: "top",
            description: "Please try again with correct credentials.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          break;
        case 409:
          toast({
            title: "User already exists.",
            description:
              "Please try different email or login in existing account.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
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
    reset();
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
                <InputGroup>
                  <Input
                    id="password"
                    mt={2}
                    variant="filled"
                    placeholder="Password"
                    borderColor={errors.password ? "red.500" : color}
                    type={show ? "text" : "password"}
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
                  <InputRightElement>
                    <IconButton
                      variant="icon"
                      aria-label="Show or hide password"
                      color="secondary"
                      backgroundColor="transparent"
                      onClick={handleClick}
                      size="sm"
                      mt={4}
                      icon={
                        show ? (
                          <Icon
                            fontSize={24}
                            weight="bold"
                            color={color}
                            as={EyeClosed}
                          />
                        ) : (
                          <Icon
                            fontSize={24}
                            weight="bold"
                            color={color}
                            as={Eye}
                          />
                        )
                      }
                    />
                  </InputRightElement>
                </InputGroup>
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
