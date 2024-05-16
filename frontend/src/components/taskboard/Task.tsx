import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { Components } from "../../types/openapi";
import { ClipboardText } from "@phosphor-icons/react";
import TaskActions from "./TaskActions";

const Task = ({
  dragOverlay,
  task,
}: {
  dragOverlay?: boolean;
  task: Components.Schemas.Task;
}) => {
  const { colorMode } = useColorMode();
  const { id, title, description, createdAt } = task || {
    title: "",
    description: "",
  };

  return (
    <Card
      width={`calc(100% - 32px)`}
      bgColor={colorMode === "light" ? "primary.200" : "primary.700"}
      sx={{
        borderRadius: "12px",
        p: 2,
        mx: 4,
        my: 2,
        cursor: dragOverlay ? "grabbing" : "grab",
      }}
    >
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Icon
              fontSize={32}
              weight="bold"
              color={colorMode === "light" ? "primary.900" : "primary.100"}
              as={ClipboardText}
            />
            <Box>
              <Heading fontSize={"18px"}>
                Task {id?.toString().padStart(4, "0")}
              </Heading>
              <Box>{title}</Box>
            </Box>
          </Flex>
          <TaskActions task={task} />
        </Flex>
      </CardHeader>
      <CardBody>
        <Box mb={1}>
          Created at: {new Date(createdAt || "")?.toLocaleString()}
        </Box>
        <Box>{description || "No description"}</Box>
      </CardBody>
    </Card>
  );
};

export default Task;
