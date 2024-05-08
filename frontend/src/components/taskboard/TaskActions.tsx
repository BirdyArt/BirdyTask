import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Components } from "../../types/openapi";
import { DotsThreeVertical, Pencil, Trash } from "@phosphor-icons/react";
import { client } from "../../api/birdy-task-api";
import { useSetRecoilState } from "recoil";
import { itemGroupsState } from "../../state/item-groups/ItemGroupsState";

const TaskActions = ({ task }: { task?: Components.Schemas.Task }) => {
  const { colorMode } = useColorMode();
  const setItemGroups = useSetRecoilState(itemGroupsState);
  const { id, title, description, createdAt, status } = task || {
    title: "",
    description: "",
  };
  const color = useColorModeValue("primary.100", "primary.900");
  const colorHover = useColorModeValue("primary.300", "primary.800");
  const toast = useToast();

  const handleTaskDelete = async () => {
    try {
      await client.deleteTaskById(id);
      setItemGroups((prev: any) => {
        const newGroups = { ...prev };
        newGroups[status || ""] = newGroups[status || ""].filter(
          (t: Components.Schemas.Task) => t.id !== id
        );
        return newGroups;
      });
    } catch (error: any) {
      toast({
        title: "Unknown error occurred.",
        description: "Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleEditTask = () => {
    console.log("Task edited");
  };

  return (
    <Menu placement="auto-end">
      <MenuButton
        as={IconButton}
        aria-label="See menu"
        data-no-dnd="true"
        icon={
          <Icon
            fontSize={32}
            weight="bold"
            color={colorMode === "light" ? "primary.900" : "primary.100"}
            as={DotsThreeVertical}
          />
        }
        bgColor={"transparent"}
        _hover={{
          bgColor: colorMode === "light" ? "primary.300" : "primary.600",
        }}
        color={colorMode === "light" ? "primary.800" : "primary.100"}
      />
      <MenuList backgroundColor={color} data-no-dnd="true">
        <MenuItem
          icon={<Icon fontSize={24} weight="bold" as={Pencil} />}
          onClick={handleEditTask}
          backgroundColor={color}
          sx={{
            "&:hover": {
              backgroundColor: colorHover,
            },
          }}
        >
          Edit Task
        </MenuItem>
        <MenuItem
          icon={<Icon fontSize={24} weight="bold" as={Trash} />}
          onClick={handleTaskDelete}
          backgroundColor={color}
          color={"red.500"}
          sx={{
            "&:hover": {
              backgroundColor: colorHover,
            },
          }}
        >
          Delete Task
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TaskActions;
