import { create } from "zustand";
import { Task } from "../utils/types";

interface TasksState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  changeTaskStatus: (taskId: number, status: string) => void;
}

export const useTasksStore = create<TasksState>()((set) => ({
  tasks: [],
  setTasks(tasks) {
    set(() => ({ tasks }));
  },
  changeTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id == taskId) {
          return {
            ...task,
            status,
          };
        }
        return task;
      }),
    })),
  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
  //   updateBears: (newBears) => set({ bears: newBears }),
}));
