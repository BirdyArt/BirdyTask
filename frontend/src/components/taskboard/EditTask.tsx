import {
  Button,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Components } from "../../types/openapi";
import { Pencil } from "@phosphor-icons/react";
import { client } from "../../api/birdy-task-api";
import { useSetRecoilState } from "recoil";
import { itemGroupsState } from "../../state/item-groups/ItemGroupsState";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const EditTask = ({ task }: { task: Components.Schemas.Task }) => {
  const setItemGroups = useSetRecoilState(itemGroupsState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id, title, description, status } = task || {
    title: "",
    description: "",
  };
  const color = useColorModeValue("primary.100", "primary.900");
  const colorHover = useColorModeValue("primary.300", "primary.800");
  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Prevent dnd working in edit task modal
  useEffect(() => {
    let timer = setTimeout(() => {
      const modalContent = document.getElementsByClassName(
        "chakra-modal__content-container"
      );
      if (modalContent.length)
        modalContent[0].setAttribute("data-no-dnd", "true");
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  const onSubmit = async (values: any) => {
    try {
      const updatedTask = {
        title: values.title,
        description: values.description,
        status,
      };
      const { data } = await client.editTaskById(id, updatedTask);
      setItemGroups((prev: any) => {
        let newGroups = { ...prev };
        newGroups[status || ""] = newGroups[status || ""].map(
          (t: Components.Schemas.Task) => (t.id === id ? data : t)
        );
        return newGroups;
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
      <MenuItem
        icon={<Icon fontSize={24} weight="bold" as={Pencil} />}
        onClick={onOpen}
        backgroundColor={color}
        sx={{
          "&:hover": {
            backgroundColor: colorHover,
          },
        }}
      >
        Edit Task
      </MenuItem>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(3px) hue-rotate(180deg)"
        />
        <ModalContent data-no-dnd="true">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Task {id}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Please edit task information below.
              <FormControl isInvalid={Object.keys(errors).length > 0}>
                <Input
                  id="title"
                  defaultValue={title}
                  mt={2}
                  borderColor={errors.title ? "red.500" : color}
                  sx={{
                    "&:focus": {
                      borderColor: errors.title ? "red.500" : color,
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
                  defaultValue={description}
                  borderColor={errors.description ? "red.500" : color}
                  sx={{
                    "&:focus": {
                      borderColor: errors.description ? "red.500" : color,
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

export default EditTask;
