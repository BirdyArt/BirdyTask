import { Box, GridItem } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import SortableTask from "./SortableTask";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

const TaskColumn = ({ id, items }: { id: string; items: any }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <GridItem
      w="100%"
      h={`calc(${window.innerHeight}px - 180px)`}
      bg={isOver ? "primary.700" : "primary.800"}
      borderRadius={"20px"}
      ref={setNodeRef}
    >
      <Box textAlign="center" fontSize={"larger"} mt={2}>
        {id}
      </Box>
      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        {items.map((item: any) => (
          <SortableTask key={item} id={item} />
        ))}
      </SortableContext>
    </GridItem>
  );
};

export default TaskColumn;
