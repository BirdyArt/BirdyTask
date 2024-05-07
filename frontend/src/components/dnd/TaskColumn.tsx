import { Box, Grid, GridItem, useColorMode } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import SortableTask from "./SortableTask";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Components } from "../../types/openapi";
import CreateTask from "./CreateTask";

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
      h={`calc(${window.innerHeight}px - 165px)`}
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
          {id === "new" ? <CreateTask /> : null}
        </GridItem>
      </Grid>
      <Box overflow={"auto"} h={`calc(${window.innerHeight}px - 216px)`}>
        <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
          {items.map((item: Components.Schemas.Task) => (
            <SortableTask key={item.id} task={item} />
          ))}
        </SortableContext>
      </Box>
    </GridItem>
  );
};

export default TaskColumn;
