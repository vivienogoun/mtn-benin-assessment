import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "../../lib/axios";
import { Button } from "../../components/button";
const emptyData = {
  title: "",
  description: "",
};

export default function NewTask() {
  const navigate = useNavigate();

  const [data, setData] = useState(emptyData);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .post("/tasks", data)
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
        <p>Add task</p>
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            autoFocus
            className="flex h-9 w-full rounded-md border focus-visible:border-yellow-400 bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none md:text-sm"
            value={data.title}
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
            value={data.description}
            onChange={(event) =>
              setData((prevState) => ({
                ...prevState,
                description: event.target.value,
              }))
            }
          ></textarea>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <Button label="Add" submit classname="w-full bg-yellow-400" />
      </form>
    </div>
  );
}
