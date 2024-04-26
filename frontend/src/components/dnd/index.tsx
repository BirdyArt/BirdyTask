import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./Droppable";
import Draggable from "./Draggable";
import { Grid } from "@chakra-ui/react";

const Dnd = () => {
  const containers = ["New", "Active", "Closed"];
  const [parent, setParent] = useState("New");
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mx={8}>
        {containers.map((id) => (
          <Droppable key={id} id={id}>
            {parent === id ? draggableMarkup : null}
          </Droppable>
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
