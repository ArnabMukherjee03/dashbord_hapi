import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import {useParams} from "react-router-dom";
import { toast } from 'react-toastify';
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { createCard, createList } from "../api/api";

export const CreateCard = ({length,listId}) => {
  const {id} = useParams();
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: createCard,
    onSuccess: (response)=>{
       toast.success(response?.message)  
       queryClient.invalidateQueries({
        queryKey: ["board"],
       })
       setTitle("")
       setAdd(false)
    },
    onError: (err)=>{
      toast.error(err.response.data.message);
    }
  })

  const handleAdd = (e)=>{
    e.preventDefault()
    mutate({title: title,order: length,listId:listId,boardId:id})
    console.log({title: title,order: length,listId:listId});
  }

  return (
    <div
      className="h-max p-2 min-w-[30%] bg-slate-100 rounded-md cursor-pointer"
    >
      {add ? (
        <>
          <form onSubmit={handleAdd}>
          <input
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Enter Task"
            className="px-1 w-full py-1 outline-none border rounded border-black placeholder:text-sm"
          />
          <div className="mt-4 flex items-center gap-4">
          <button className=" bg-black text-white text-sm py-2 w-20">Add Task</button>
          <div onClick={()=>setAdd(false)} className=""><IoMdClose /></div>
          </div>
          </form>
          
        </>
      ) : (
        <p onClick={() => {
            setAdd(true);
          }} className="text-sm w-full">
          <FaPlus className="inline mr-2" /> Create new Task
        </p>
      )}
    </div>
  );
};
