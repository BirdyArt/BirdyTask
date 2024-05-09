import { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Grid, useToast } from "@chakra-ui/react";
import Task from "./Task";
import TaskColumn from "./TaskColumn";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
  MouseSensor,
  TouchSensor,
  arrayMove,
  insertAtIndex,
  removeAtIndex,
} from "../../utils";
import { client } from "../../api/birdy-task-api";
import { Components } from "../../types/openapi";
import { useRecoilState } from "recoil";
import { itemGroupsState } from "../../state/item-groups/ItemGroupsState";

const TaskBoard = () => {
  const [itemGroups, setItemGroups] = useRecoilState(itemGroupsState);
  const [loading, setLoading] = useState(false);
  const [activeTask, setActiveTask] = useState<Components.Schemas.Task | null>(
    null
  );
  const toast = useToast();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await client.getTasks();
        let tasksSortedInGroups = structuredClone(itemGroups);
        data.forEach((task) => tasksSortedInGroups[task.status].push(task));
        setItemGroups(tasksSortedInGroups);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast({
          title: "Unknown error occurred.",
          description: "Please try again later.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    })();
  }, []);

  const handleDragStart = ({ active }: DragStartEvent) => {
    const activeItem = itemGroups[
      active.data.current?.sortable.containerId
    ].find((item: any) => item.id === active.id);
    setActiveTask(activeItem);
  };

  const updateTask = async (containerId: UniqueIdentifier) => {
    try {
      await client.editTaskById(activeTask?.id, {
        title: activeTask?.title,
        description: activeTask?.description,
        status: containerId.toString(),
      });
    } catch (error) {
      toast({
        title: "Unknown error occurred.",
        description: "Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDragCancel = () => setActiveTask(null);

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer: string =
      over.data.current?.sortable.containerId || over.id;
    if (activeContainer !== overContainer) {
      setItemGroups((itemGroups: any) => {
        const activeIndex = active.data.current?.sortable.index;
        const overIndex =
          over.id in itemGroups
            ? itemGroups[overContainer].length + 1
            : over.data.current?.sortable.index;
        return moveBetweenContainers(
          itemGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          activeTask
        );
      });
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setActiveTask(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex =
        over.id in itemGroups
          ? itemGroups[overContainer].length + 1
          : over.data.current?.sortable.index;

      setItemGroups((itemGroups: any) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(
              itemGroups[overContainer],
              activeIndex,
              overIndex
            ),
          };
        } else {
          newItems = moveBetweenContainers(
            itemGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            activeTask
          );
        }
        return newItems;
      });
    }
    setActiveTask(null);
  };

  const moveBetweenContainers = (
    items: Components.Schemas.Task[],
    activeContainer: any,
    activeIndex: any,
    overContainer: any,
    overIndex: any,
    item: Components.Schemas.Task | null
  ) => {
    updateTask(overContainer);
    let newItem = { ...item };
    newItem.status = overContainer;

    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, newItem),
    };
  };

  return loading ? null : (
    <Grid templateColumns="repeat(4, 1fr)" gap={6} mx={8}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {Object.keys(itemGroups).map((group) => (
          <TaskColumn id={group} items={itemGroups[group]} key={group} />
        ))}
        <DragOverlay>
          {activeTask ? <Task task={activeTask} dragOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </Grid>
  );
};

export default TaskBoard;
