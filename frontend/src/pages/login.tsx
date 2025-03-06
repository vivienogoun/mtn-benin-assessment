import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/button";
import axios from "../lib/axios";

const emptyData = {
  email: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState(emptyData);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .post("/auth/login", data)
      .then((response) => {
        const data = response.data;
        if (data.success == true) {
          localStorage.setItem("jwt-token", data.data.access_token);
          setData(emptyData);
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
        <p>Login</p>
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="flex h-9 w-full rounded-md border focus-visible:border-yellow-400 bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none md:text-sm"
            value={data.email}
            onChange={(event) =>
              setData((prevState) => ({
                ...prevState,
                email: event.target.value,
              }))
            }
          />
        </div>
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="flex h-9 w-full rounded-md border focus-visible:border-yellow-400 bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none md:text-sm"
            value={data.password}
            onChange={(event) =>
              setData((prevState) => ({
                ...prevState,
                password: event.target.value,
              }))
            }
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button label="Login" submit classname="w-full bg-yellow-400" />
        <Link to={"/register"} className="text-blue-500 underline">
          Register
        </Link>
      </form>
    </div>
  );
}
