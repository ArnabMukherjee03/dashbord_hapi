import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import {useMutation} from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { login } from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const {mutate,isPending} = useMutation({
    mutationFn: login,
    onSuccess: (response)=>{
       toast.success(response?.message)
       localStorage.setItem("token",response?.data.accessToken)
       navigate("/")
    },
    onError: (err)=>{
      toast.error(err.response.data.message);
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate({email,password});
  }

   
  return (
    <div className="font-primary flex items-center justify-center h-screen">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label
            
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
           autoComplete="off"
            className="w-full border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed"
            type="submit"
            disabled={isPending}
          >
            Login
          </button>
        </div>
        <div className="text-sm">
          <Link to="/forgotpassword"><p className="text-sm hover:underline mb-2">Forgot Password?</p></Link>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
