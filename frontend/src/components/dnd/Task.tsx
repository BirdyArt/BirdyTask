import { Box } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";

const Draggable = (props: any) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  return (
    <Box
      ref={setNodeRef}
      width={`calc(100% - 16px)`}
      {...listeners}
      {...attributes}
      sx={{
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
        borderRadius: "12px",
        bg: "secondary",
        textAlign: "center",
        color: "primary.900",
        p: 2,
        m: 2,
      }}
    >
      {props.children}
    </Box>
  );
};

export default Draggable;
