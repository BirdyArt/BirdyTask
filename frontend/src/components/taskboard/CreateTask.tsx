import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Icon,
  IconButton,
  useColorMode,
  useDisclosure,
  useToast,
  useColorModeValue,
  FormControl,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { client } from "../../api/birdy-task-api";

const CreateTask = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const color = useColorModeValue("primary.900", "secondary");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      await client.createTask(null, {
        title: values.title,
        description: values.description,
        status: values.status,
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Unknown error occurred.",
        description: "Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    reset();
  };

  return (
    <>
      <IconButton
        aria-label="Add task"
        icon={<Icon fontSize={24} weight="bold" as={Plus} />}
        size="sm"
        mr={4}
        bgColor={"transparent"}
        _hover={{
          bgColor: colorMode === "light" ? "primary.200" : "primary.700",
        }}
        color={colorMode === "light" ? "primary.800" : "primary.100"}
        onClick={onOpen}
      />
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(3px) hue-rotate(180deg)"
        />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Create Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Please provide information for new task.
              <FormControl isInvalid={Object.keys(errors).length > 0}>
                <Input
                  id="title"
                  mt={2}
                  borderColor={errors.email ? "red.500" : color}
                  sx={{
                    "&:focus": {
                      borderColor: errors.email ? "red.500" : color,
                    },
                  }}
                  variant="filled"
                  placeholder="Title"
                  {...register("title", {
                    required: "This is required",
                    maxLength: {
                      value: 50,
                      message: "Title is too long",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message?.toString()}
                </FormErrorMessage>
                <Textarea
                  id="description"
                  mt={2}
                  borderColor={errors.email ? "red.500" : color}
                  sx={{
                    "&:focus": {
                      borderColor: errors.email ? "red.500" : color,
                    },
                  }}
                  variant="filled"
                  placeholder="Description"
                  {...register("description", {
                    required: "This is required",
                    maxLength: {
                      value: 150,
                      message: "Description is too long",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message?.toString()}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Button isLoading={isSubmitting} type="submit">
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTask;
