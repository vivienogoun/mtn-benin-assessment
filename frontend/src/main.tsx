import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/login.tsx";
import NewTask from "./pages/tasks/new.tsx";
import Register from "./pages/register.tsx";
import TaskView from "./pages/tasks/detail.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="new-task" element={<NewTask />} />
        <Route path="tasks/:taskId" element={<TaskView />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
