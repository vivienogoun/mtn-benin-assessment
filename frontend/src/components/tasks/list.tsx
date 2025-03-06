import { useDrop } from "react-dnd";
import { ItemTypes, Task } from "../../utils/types";
import { TaskCard } from "./card";
import axios from "../../lib/axios";
import { useTasksStore } from "../../lib/store";

export function TaskList({ title, tasks }: { title: string; tasks?: Task[] }) {
  const { changeTaskStatus } = useTasksStore((state) => state);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      drop(item: { taskId: number }) {
        // console.log({ item });
        const taskId = item.taskId;
        axios
          .put(`/tasks/${taskId}`, {
            status: getListStatusFromTitle(title),
          })
          .then((response) =>
            changeTaskStatus(taskId, getListStatusFromTitle(title))
          )
          .catch((error) => console.log(error));
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
      }}
      className="min-w-72 bg-slate-200 p-4 space-y-4"
    >
      <p>{title}</p>
      <div className="flex flex-col gap-2">
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {isOver && <div className="p-4 bg-slate-300 rounded h-16"></div>}
      </div>
    </div>
  );
}

function getListStatusFromTitle(title: string) {
  switch (title) {
    case "Pending":
      return "pending";
    case "Done":
      return "done";
    default:
      return "inprogress";
  }
}
