import { Box } from "@chakra-ui/react";
import { UniqueIdentifier } from "@dnd-kit/core";

const Task = ({
  id,
  dragOverlay,
}: {
  id: UniqueIdentifier;
  dragOverlay?: boolean;
}) => {
  return (
    <Box
      width={`calc(100% - 16px)`}
      sx={{
        borderRadius: "12px",
        bg: "secondary",
        textAlign: "center",
        color: "primary.900",
        cursor: dragOverlay ? "grabbing" : "grab",
        p: 2,
        m: 2,
      }}
    >
      Task {id}
    </Box>
  );
};

export default Task;
