import { Box, GridItem, useColorMode } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import SortableTask from "./SortableTask";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Components } from "../../types/openapi";

const TaskColumn = ({
  id,
  items,
}: {
  id: string;
  items: Components.Schemas.Task[];
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const { colorMode } = useColorMode();

  return (
    <GridItem
      w="100%"
      h={`calc(${window.innerHeight}px - 180px)`}
      bg={isOver ? "primary.700" : "primary.800"}
      borderRadius={"20px"}
      ref={setNodeRef}
      bgColor={colorMode === "light" ? "primary.100" : "primary.800"}
    >
      <Box
        textAlign="center"
        fontSize={"larger"}
        mt={2}
        color={colorMode === "light" ? "primary.800" : "primary.100"}
      >
        {id}
      </Box>
      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        {items.map((item: any) => (
          <SortableTask key={item.id} task={item} />
        ))}
      </SortableContext>
    </GridItem>
  );
};

export default TaskColumn;
