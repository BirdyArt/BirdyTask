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
          <IconButton
            aria-label="See menu"
            data-no-dnd="true"
            bgColor={"transparent"}
            _hover={{
              bgColor: colorMode === "light" ? "primary.300" : "primary.600",
            }}
            color={colorMode === "light" ? "primary.800" : "primary.100"}
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
