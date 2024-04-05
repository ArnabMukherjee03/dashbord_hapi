import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CardDes } from "./CardDes";

const Card = ({task}) => {
  const [show,setShow] = useState(false);
  return (
    <>
    <Draggable draggableId={task.id.toString()} index={task.order}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={()=>{setShow(true)}}
          className={` px-2 py-2 bg-white rounded ${snapshot.isDragging ? " shadow" : ""}`}
        >
        <p>{task.title}</p>
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