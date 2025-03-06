import { useDrag } from "react-dnd";
import { ItemTypes, Task } from "../../utils/types";
import { Link } from "react-router";

export function TaskCard({ task }: { task: Task }) {
  // console.log(task);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: { taskId: task.id },
  }));

  return (
    <Link
      to={`/tasks/${task.id}`}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        // fontSize: 25,
        // fontWeight: "bold",
        cursor: "move",
      }}
      className="p-4 bg-white rounded"
    >
      <p>{task.title}</p>
      <p>{task.description}</p>
    </Link>
  );
}
