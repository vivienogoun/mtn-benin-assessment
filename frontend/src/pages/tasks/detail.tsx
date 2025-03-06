import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "../../lib/axios";
import { Button } from "../../components/button";
import { Task } from "../../utils/types";

export default function TaskView() {
  const params = useParams();
  const taskId = params.taskId;
  const navigate = useNavigate();

  const [data, setData] = useState<Partial<Task>>();
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/tasks/${taskId}`)
      .then((response) => {
        const data = response.data;
        setData(data.task);
      })
      .catch(() => navigate("/"));
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .put(`/tasks/${data?.id}`, data)
      .then((response) => {
        const data = response.data;
        if (data.success == true) {
          navigate("/");
        } else {
          setError(data.message);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border-black/50 border p-8 rounded"
      >
        <Link to="/" className="text-blue-500 underline">
          Back
        </Link>
        <p>View and Edit task</p>
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="flex h-9 w-full rounded-md border focus-visible:border-yellow-400 bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none md:text-sm"
            value={data?.title ?? ""}
            onChange={(event) =>
              setData((prevState) => ({
                ...prevState,
                title: event.target.value,
              }))
            }
          />
        </div>
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            className="flex h-9 w-full rounded-md border focus-visible:border-yellow-400 bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none md:text-sm"
            rows={4}
            value={data?.description ?? ""}
            onChange={(event) =>
              setData((prevState) => ({
                ...prevState,
                description: event.target.value,
              }))
            }
          ></textarea>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <Button label="Save" submit classname="w-full bg-yellow-400" />
        <Button
          onClick={() => {
            axios
              .delete(`/tasks/${data?.id}`)
              .then((response) => {
                const data = response.data;
                if (data.success == true) {
                  navigate("/");
                } else {
                  setError(data.message);
                }
              })
              .catch((error) => console.log(error));
          }}
          label="Delete"
          submit
          classname="w-full bg-red-400"
        />
      </form>
    </div>
  );
}
