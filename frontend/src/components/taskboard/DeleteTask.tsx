import { Icon, MenuItem, useColorModeValue, useToast } from "@chakra-ui/react";
import { Components } from "../../types/openapi";
import { Trash } from "@phosphor-icons/react";
import { client } from "../../api/birdy-task-api";
import { useSetRecoilState } from "recoil";
import { itemGroupsState } from "../../state/item-groups/ItemGroupsState";

const DeleteTask = ({ task }: { task: Components.Schemas.Task }) => {
  const setItemGroups = useSetRecoilState(itemGroupsState);
  const { id, status } = task || {
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

  return (
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
  );
};

export default DeleteTask;
