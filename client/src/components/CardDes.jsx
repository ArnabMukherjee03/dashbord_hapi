import { CiGrid32 } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { GoSortDesc } from "react-icons/go";
import { useEffect, useState } from "react";
import {useMutation,useQueryClient} from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { updateCard } from "../api/api";
import {useParams} from "react-router-dom"
import { CommentSection } from "./CommentSection";

export const CardDes = ({ taskId, close, task }) => {
    const params = useParams()
    const [isdisabled,setIsDisabled] = useState(true);
    const [description,setDescription] = useState("");
    const queryClient = useQueryClient();

    useEffect(()=>{
      setDescription(task.description)
    },[task])

    const {mutate,isPending} = useMutation({
      mutationFn: updateCard,
      onSuccess: (response)=>{
         toast.success(response?.message)   

         queryClient.invalidateQueries({
          queryKey: ["boards"],
         })

         setIsDisabled(true);
         
      },
      onError: (err)=>{
        toast.error(err.response.data.message);
      }
    })


    const handleUpdate = ()=>{
     mutate({update:{description,boardId:params.id},id:task?.id})
    }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black  bg-opacity-40 flex items-center justify-center">
      <div className="bg-slate-100 rounded-md w-2/5 h-max p-4">
        <div className="flex justify-between">
            {/* Task Name Along With List Name */}
          <div className="flex gap-2 items-center">
            <CiGrid32 />
            {task?.title}
          </div>
          <IoCloseSharp className="cursor-pointer" onClick={close}  />
        </div>
        {/* Task Description */}
        <div className="mt-4">
            <div className="flex items-center gap-2 ">
                <GoSortDesc />
                Description
            </div>
            <div className="w-full mt-4">
                {
                  isdisabled?
                  <p onClick={()=>setIsDisabled(false)} className="w-full outline-none p-2 h-10 bg-white cursor-pointer">{description}</p>
                  :
                  <>
                  <textarea onChange={(e)=>setDescription(e.target.value)} defaultValue={description} disabled={isdisabled}  name="" id="" cols="30" rows="10" className="w-full outline-none p-2 h-20 disabled:cursor-pointer"></textarea>
                  <div className="flex gap-4">
                     <button disabled={isPending} onClick={handleUpdate} className="py-1 bg-black w-20 text-white disabled:bg-opacity-10" >Save</button>
                     <button onClick={()=>{setIsDisabled(true)}}>Close</button>
                  </div>
                  </>
                }
            </div>
        </div>
        {/* Comment Section */}
        <div className="">
          <CommentSection id={task.id}/>
        </div>
      </div>
    </div>
  );
};
