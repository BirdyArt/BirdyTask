import { useSortable } from "@dnd-kit/sortable";
import Task from "./Task";
import { Box } from "@chakra-ui/react";
import { CSS } from "@dnd-kit/utilities";
import { Components } from "../../types/openapi";

const SortableTask = ({
  id,
  task,
}: {
  id: string;
  task: Components.Schemas.Task;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Box style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <Task id={id} task={task} />
    </Box>
  );
};

export default SortableTask;
