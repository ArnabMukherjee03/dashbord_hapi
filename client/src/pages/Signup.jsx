import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import {useMutation} from "@tanstack/react-query";
import { signup } from '../api/api';
import { toast } from 'react-toastify';


const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {mutate,isPending} = useMutation({
    mutationFn: signup,
    onSuccess: (response)=>{
       toast.success(response.message)
       navigate("/login")
    },
    onError: (err)=>{
      toast.error(err.response.data.message);
    }
  })
  

  return (
    <div className="font-primary flex items-center justify-center h-screen">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={(e)=>{e.preventDefault(); mutate({name,email,password})}}>
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full border-b rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            autoComplete="off"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
           autoComplete="off"
            className="w-full border-b rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full border-b rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
       
        <div className="flex items-center mb-4">
          <button
            className="bg-black hover:opacity-[0.8] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:cursor-not-allowed "
            type="submit"
            disabled={isPending}
          >
            Register
          </button>
        </div>
        <div className="text-sm">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login now
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
