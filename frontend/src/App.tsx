import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router";
import { Button } from "./components/button";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskList } from "./components/tasks/list";
import axios from "./lib/axios";
import { useTasksStore } from "./lib/store";

export default function App() {
  const { tasks, setTasks } = useTasksStore((state) => state);

  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    setToken(token ?? "");

    axios
      .get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUserData(response.data.user))
      .catch((error) => console.log(error));

    axios
      .get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setTasks(response.data.tasks))
      .catch((error) => console.log(error));
  }, []);

  function logout() {
    setToken("");
    localStorage.removeItem("jwt-token");
  }

  if (!token) {
    return (
      <>
        <main style={{ padding: "50px" }}>
          <p>You&apos;re not logged in.</p>
          <Link
            to={"/login"}
            className="bg-yellow-400 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none cursor-pointer w-full"
          >
            Login
          </Link>
        </main>
      </>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>Hello, {userData.name}</div>
          <Link
            to={"/new-task"}
            className="bg-yellow-400 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none cursor-pointer"
          >
            Add task
          </Link>
        </div>
        <Button onClick={logout} label="Logout" />
      </div>
      <hr className="mb-8 mt-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-[80vh]">
        <TaskList
          title="Pending"
          tasks={tasks?.filter((task) => task.status == "pending")}
        />
        <TaskList
          title="In progress"
          tasks={tasks?.filter((task) => task.status == "inprogress")}
        />
        <TaskList
          title="Done"
          tasks={tasks?.filter((task) => task.status == "done")}
        />
      </div>
    </DndProvider>
  );
}
