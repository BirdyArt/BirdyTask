import { Icon, MenuItem, useColorModeValue, useToast } from "@chakra-ui/react";
import { Components } from "../../types/openapi";
import { Pencil } from "@phosphor-icons/react";
import { client } from "../../api/birdy-task-api";
import { useSetRecoilState } from "recoil";
import { itemGroupsState } from "../../state/item-groups/ItemGroupsState";

const EditTask = ({ task }: { task: Components.Schemas.Task }) => {
  const setItemGroups = useSetRecoilState(itemGroupsState);
  const { id, title, description, createdAt, status } = task || {
    title: "",
    description: "",
  };
  const color = useColorModeValue("primary.100", "primary.900");
  const colorHover = useColorModeValue("primary.300", "primary.800");
  const toast = useToast();

  const handleEditTask = async () => {
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
  );
};

export default EditTask;
