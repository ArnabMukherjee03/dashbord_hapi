import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import {useMutation,useQueryClient} from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { createBoard } from "../api/api";

export const CreateBoard = ({onClick}) => {
  const [selected,setSelected] = useState("");
  const [name,setName] = useState("");
  const queryClient = useQueryClient();

  const photos = [
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const {mutate,isPending} = useMutation({
    mutationFn: createBoard,
    onSuccess: (response)=>{
       toast.success(response?.message)  
       onClick(); 
       queryClient.invalidateQueries({
        queryKey: ["boards"],
       })
    },
    onError: (err)=>{
      toast.error(err.response.data.message);
    }
  })

  const handleSubmit = ()=>{
     mutate({
      name: name,
      image: selected
   })
  }

  return (
    <div className="w-60 px-2 py-4 shadow-md border rounded-md">
      <div className="w-full relative">
        <h1 className=" text-sm text-center pb-2">Create Board</h1>
        <div
          className="absolute top-0 right-2 cursor-pointer text-sm"
          onClick={onClick}
        >
          X
        </div>
      </div>
      <div className="flex flex-wrap w-full gap-2 justify-center">
        {photos?.map((photo, index) => {
          return (
            <div className="relative" key={index} onClick={()=> setSelected(photo)}>
             {photo === selected ?<FaCheck className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />:""}
            <img className="w-16 cursor-pointer"  src={photo} />
            </div>
          );
        })}
      </div>
      <div className="w-full mt-2 px-2">
        <label className="block text-gray-700 text-sm" htmlFor="title">
          Board Title
        </label>
        <input
          autoComplete="off"
          className="w-full border border-black px-1 mt-2 outline-none"
          id="title"
          type="text"
          onChange={(e)=>setName(e.target.value)}
        />
      </div>
      <div onClick={handleSubmit} className="bg-black text-white text-center mt-2 mx-2 cursor-pointer py-1">
        Create board
      </div>
    </div>
  );
};
