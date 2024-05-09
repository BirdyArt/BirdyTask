import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Components } from "../../types/openapi";
import { DotsThreeVertical } from "@phosphor-icons/react";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

const TaskActions = ({ task }: { task: Components.Schemas.Task }) => {
  const { colorMode } = useColorMode();
  const color = useColorModeValue("primary.100", "primary.900");

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
        <EditTask task={task} />
        <DeleteTask task={task} />
      </MenuList>
    </Menu>
  );
};

export default TaskActions;
