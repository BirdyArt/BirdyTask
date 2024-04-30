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
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "../../state/user-info/UserInfoState";
import { client } from "../../api/birdy-task-api";

const Login = ({
  onClose,
  handleShowLoginOrSignup,
  setIsOpen,
}: {
  onClose: () => void;
  handleShowLoginOrSignup: () => void;
  setIsOpen?: (value: boolean) => void;
}) => {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const color = useColorModeValue("primary.900", "secondary");
  const setUserInfo = useSetRecoilState(userInfoState);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleClick = () => setShow(!show);

  const onSubmit = async (values: any) => {
    try {
      const { data } = await client.signin(null, {
        email: values.email,
        password: values.password,
      });
      const { access_token }: any = data;
      client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token}`;
      localStorage.setItem("access_token", `Bearer ${access_token}`);
      const user = await client.getMe();
      // await client.createTask(null, {
      //   title: "Active Task",
      //   description: "This is an active task.",
      //   status: "active",
      // });
      setUserInfo(user.data);
      if (setIsOpen) setIsOpen(false);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader>Login</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        Please provide your credentials to login.
        <FormControl isInvalid={Object.keys(errors).length > 0}>
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
                    <Icon fontSize={24} weight="bold" color={color} as={Eye} />
                  )
                }
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <Box pt={2} textAlign="center">
          Don't have an account?{" "}
          <Button variant="link" onClick={handleShowLoginOrSignup}>
            Sign up
          </Button>
        </Box>
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
  );
};

export default Login;
