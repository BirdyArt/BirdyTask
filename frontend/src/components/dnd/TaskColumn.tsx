import {
  Grid,
  GridItem,
  Icon,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import SortableTask from "./SortableTask";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Components } from "../../types/openapi";
import { Plus } from "@phosphor-icons/react";

const TaskColumn = ({
  id,
  items,
}: {
  id: string;
  items: Components.Schemas.Task[];
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  const { colorMode } = useColorMode();

  return (
    <GridItem
      w="100%"
      h={`calc(${window.innerHeight}px - 180px)`}
      borderRadius={"12px"}
      ref={setNodeRef}
      bgColor={colorMode === "light" ? "primary.100" : "primary.800"}
    >
      <Grid
        fontSize={"larger"}
        mt={2}
        templateColumns="repeat(3, 1fr)"
        color={colorMode === "light" ? "primary.800" : "primary.100"}
      >
        <GridItem></GridItem>
        <GridItem textAlign={"center"} mt={1}>
          {id}
        </GridItem>
        <GridItem textAlign={"end"}>
          {id === "new" ? (
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
              onClick={() => console.log("Add task")}
            />
          ) : null}
        </GridItem>
      </Grid>
      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        {items.map((item: any) => (
          <SortableTask key={item.id} task={item} />
        ))}
      </SortableContext>
    </GridItem>
  );
};

export default TaskColumn;
