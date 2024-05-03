import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { Components } from "../../types/openapi";
import { ClipboardText, DotsThreeVertical } from "@phosphor-icons/react";

const Task = ({
  dragOverlay,
  task,
}: {
  dragOverlay?: boolean;
  task?: Components.Schemas.Task;
}) => {
  const { colorMode } = useColorMode();
  const { id, title, description } = task || { title: "", description: "" };

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
              <Heading size="sm">Task {id}</Heading>
              <Box>{title}</Box>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={
              <Icon
                fontSize={32}
                weight="bold"
                color={colorMode === "light" ? "primary.900" : "primary.100"}
                as={DotsThreeVertical}
              />
            }
          />
        </Flex>
      </CardHeader>
      <CardBody>{description || "No description"}</CardBody>
    </Card>
  );
};

export default Task;
