import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Grid } from "@chakra-ui/react";
import Task from "./Task";
import TaskColumn from "./TaskColumn";

const Dnd = () => {
  const containers = ["New", "Active", "Closed"];
  const [parent, setParent] = useState("New");
  const draggableMarkup = <Task id="draggable">Task</Task>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mx={8}>
        {containers.map((id) => (
          <TaskColumn key={id} id={id}>
            {parent === id ? draggableMarkup : null}
          </TaskColumn>
        ))}
      </Grid>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const { over } = event;
    setParent(over ? over.id : null);
  }
};

export default Dnd;
