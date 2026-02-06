import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

function Login() {
  const [currentState, setCurrentState] = useState("Login");
  const { setToken, token, backendUrl, setCartItems, navigate } =
    useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      if (currentState === "Login") {
        const res = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else {
          toast.error(res.data.message);
        }
        // navigate("/");
      } else {
        const res = await axios.post(`${backendUrl}/api/user/register`, {
          email,
          password,
          name,
        });
        console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else {
          toast.error(res.data.message);
        }
        // navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="First name"
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login;
