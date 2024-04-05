import Card from "../components/Card";
import { Navbar } from "../components/Navbar";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dragAndDrop, getList, getPermissionUser } from "../api/api";
import { useParams,useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { CreateList } from "../components/CreateList";
import { CreateCard } from "../components/CreateCard";
import { useEffect } from "react";
import { useState } from "react";
import { FaUserTie } from "react-icons/fa6";

export const Boards = () => {
  const [isPermission,setIspermission] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: board,isError,error } = useQuery({
    queryKey: ["board"],
    queryFn: () => getList(params?.id),
    retry: false,
  });

  const { data: response} = useQuery({
    queryKey: ["permission"],
    queryFn: () => getPermissionUser(params?.id),
    retry: false,
  });

  useEffect(()=>{
    if(isError){
       if(error.response.data.message.includes("User don't have permission")){
        navigate("/")
        toast.error(error.response.data.message);
       }
    }
  },[isError,error,navigate])

  const { mutate } = useMutation({
    mutationFn: dragAndDrop,
    onSuccess: (response) => {
      toast.success(response?.message);
      queryClient.invalidateQueries({
        queryKey: ["board"],
      });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
      if(err.response.data.message.includes("User don't have permission")){
        navigate("/")
      }
    },
  });

  console.log("1234",response)

  const handleDragEnd = (result) => {
    // Check if the item was dropped outside of a droppable area
    if (!result.destination) {
      return;
    }
    

    const findList = board?.board?.Lists.find(list => list.id === parseInt(result.destination.droppableId))

    const cards = [...findList.Cards]

    console.log("prev Card",cards);



    let dragData ;

    if(cards.length !== 0){
      dragData = cards.map(card=>{
        if(card.id === parseInt(result.draggableId)){
          console.log("ok1");
          return {cardId: parseInt(result.draggableId),
           update: {
           listId:parseInt(result.destination.droppableId),
           order: result.destination.index,
         }}
        }else if(card.id !== parseInt(result.draggableId) && result.destination.index < card.order){
          console.log("ok2");
         return {
           cardId: card.id,
           update: {
           listId: card.listId,
           order: card.order+1,
         }}
        }else if(parseInt(result.source.droppableId)!== parseInt(result.destination.droppableId)){
          console.log("ok3");
          return {
            cardId: parseInt(result.draggableId),
             update: {
             listId:parseInt(result.destination.droppableId),
             order: result.destination.index,
           }
          }
        } else if(card.id !== parseInt(result.draggableId) && result.destination.index > card.order){
          return {
            cardId: card.id,
            update: {
            listId: card.listId,
            order: card.order-1,
          }}
        }else if(card.id !== parseInt(result.draggableId) && result.destination.index === card.order){
          if(result.source.index > result.destination.index){
            return {
              cardId: card.id,
              update: {
              listId: card.listId,
              order: card.order+1,
            }}
          }else{
            return {
              cardId: card.id,
              update: {
              listId: card.listId,
              order: card.order-1,
            }}
          }
          
        }
     })
    }else{
        dragData = [{
          cardId: parseInt(result.draggableId),
           update: {
           listId:parseInt(result.destination.droppableId),
           order: result.destination.index+1,
         }
        }]
    }

    mutate({data:dragData,boardId:params.id});
  };

  return (
    <>
      <Navbar />
      {/* board name along with details */}

      {/* ###################### */}
      <div
        className="min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${board?.board?.image})`,
        }}
      >
        <div className="bg-black flex items-center text-white w-full h-14 bg-opacity-20 relative">
           <p className="px-10 text-xl">{board?.board?.name}</p>
           <div className="cursor-pointer bg-white text-black px-2 py-1" onClick={()=>{setIspermission(!isPermission)}}>
            Permissions
            </div>
           {isPermission && <div className="bg-white flex flex-col absolute bottom-[-100%] shadow left-36 w-40">
               {
               
                  response?.Users?.map(user => {
                    
                    return <div key={user.id} className="text-black py-1 px-4 flex gap-2 items-center">
                        <p>{user?.name}</p>
                        {user.id === board?.board?.owner?
                           <FaUserTie className="text-sm"/>
                           :
                           ""
                        }
                    </div>
                  })
               }
           </div>
           }
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex px-20 py-5  flex-grow container flex-wrap gap-4">
            {board?.board?.Lists?.map((list) => {
              return (
                <Droppable key={list.id} droppableId={list.id.toString()}>
                  {(provided, snapshot) => (
                    <div
                      className=" h-max py-2 px-4 min-w-[30%] bg-slate-100 rounded-md"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <span className=" font-bold">{list.title}</span>
                      <div className="flex flex-col gap-2 mt-4">
                        {list?.Cards?.map((card) => {
                          return <Card key={card.id} task={card} />;
                        })}
                      {provided.placeholder}
                        <CreateCard length={list?.Cards?.length} listId={list?.id}/>
                      </div>
                    </div>
                  )}
                </Droppable>
              );
            })}
            <CreateList length={board?.board?.Lists.length} />
          </div>
        </DragDropContext>
      </div>
    </>
  );
};
