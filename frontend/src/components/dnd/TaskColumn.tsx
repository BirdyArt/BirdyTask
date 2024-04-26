import { Box, GridItem } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";

const Droppable = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
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
        {props.id}
      </Box>
      {props.children}
    </GridItem>
  );
};

export default Droppable;
