import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CardDes } from "./CardDes";
import { FaUser } from "react-icons/fa";
import {useQueryClient,useMutation } from "@tanstack/react-query";
import { cardPermission } from "../api/api";
import { toast } from "react-toastify";


const Card = ({task,board}) => {
  const [show,setShow] = useState(false);
  const [showUser,setShowUser] = useState(null);
  const [permissions,setPermissions] = useState([]);
  const queryClient = useQueryClient();

  

    const user = queryClient.getQueryData(["user"])
    const permission = queryClient.getQueryData(["permission"])
   
    const {mutate,isPending} = useMutation({
      mutationFn: cardPermission,
      onSuccess: (response)=>{
         toast.success(response?.message)  
         setPermissions([])
         setShowUser(null)
      },
      onError: (err)=>{
        toast.error(err.response.data.message);
      }
    })
  
    const handleChange = (e)=>{
      const isData = permissions?.find(data=>  data.userId === parseInt(e.target.value))
      console.log(isData);
       if(isData){
          const data = permissions.filter(data=>data.userId !== parseInt(e.target.value))
          setPermissions(data);
       }else{
        setPermissions([...permissions,{
          userId: parseInt(e.target.value),
          taskId: task.id
         }])
       }
    
    }

    console.log(permissions);
   
  return (
    <>
    <Draggable draggableId={task.id.toString()} index={task.order}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
         
          className={`relative px-4 py-2 bg-white rounded  flex justify-between items-center${snapshot.isDragging ? " shadow" : ""}`}
        >
        <p className="text-xl cursor-pointer"  onClick={()=>{setShow(true)}}>{task.title}</p>
        {board.owner === user?.user?.id?<FaUser onClick={()=>setShowUser(showUser?null:task.id)} className="text-xs cursor-pointer"/>:""}
        {
           showUser === task?.id ? (<div className="absolute bg-white w-auto h-auto py-4 px-2 -right-[50%] top-0 flex flex-col gap-2 shadow">
                { permission.Users?.map(user=>{
                  return <label key={user.id} htmlFor={user.id}>
                  <input type="checkbox"  id={user.id} value={user.id}  onChange={handleChange} />
                  {user.name}
                  </label>
                })}
               
                <button disabled={isPending} onClick={()=>{
                  mutate({
                    permission: permissions,
                    boardId: board.id
                  })
                }} className="bg-black text-white  py-1 px-4">Save</button>
         

           </div>)
           : ""
        }
        </div>
      )}
    </Draggable>
    {
       show && <CardDes cardId={task?.id} close={()=>{setShow(false)}} task={task}/>
    }
    </>
  );
};

export default Card;