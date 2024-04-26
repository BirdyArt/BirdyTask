import { GridItem } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";

const Droppable = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <GridItem
      w="100%"
      h={`calc(${window.innerHeight}px - 180px)`}
      bg="primary.800"
      color={isOver ? "green" : undefined}
      borderRadius={20}
      ref={setNodeRef}
    >
      {props.children}
    </GridItem>
  );
};

export default Droppable;
