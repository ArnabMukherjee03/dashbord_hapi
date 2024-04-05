import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { addReply, deleteComment } from "../api/api";

export const Comment = ({ comment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [text,setText] = useState("");
  const queryClient = useQueryClient();

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  const {mutate,isPending} = useMutation({
    mutationFn: addReply,
    onSuccess: (response)=>{
       toast.success(response?.message)   

       queryClient.invalidateQueries({
        queryKey: ["comments"],
       })

       setText("")
       setShowReplyForm(false)
    },
    onError: (err)=>{
      toast.error(err.response.data.message);
    }
  })

  const {mutate:delComment} = useMutation({
    mutationFn: deleteComment,
    onSuccess: (response)=>{
       toast.success(response?.message)   

       queryClient.invalidateQueries({
        queryKey: ["comments"],
       })
    },
    onError: (err)=>{
      toast.error(err.response.data.message);
    }
  })

 const handleReply = (e)=>{
  e.preventDefault()
   if(comment?.cardId){
     mutate({commentId:comment?.id,text:text})
   }else{
    mutate({parentId:comment?.id,text:text})
   }
 }

 console.log(comment);

 const handleDelete = (e)=>{
  e.preventDefault();
  if(comment?.cardId){
    delComment(comment?.id)
  }
 }

  return (
    <div className="px-2 ">
      <p className="text-sm">{comment.text}</p>
      <div className="flex gap-2">
      <button
        onClick={toggleReplyForm}
        className="text-xs rounded hover:bg-black hover:bg-opacity-10 px-1 py-1"
      >
        Reply
      </button>
      <p onClick={handleDelete} className="text-red-500 text-xs hover:bg-red-100 px-1 py-1 rounded cursor-pointer">Delete</p>
      </div>
      {showReplyForm && (
        <form className="flex gap-2" onSubmit={handleReply}>
          <input
            placeholder="Write your reply..."
            className="border outline-none my-1 placeholder:text-xs px-2 py-1"
            onChange={(e)=>setText(e.target.value)}
          />
          <button disabled={isPending} type="submit" className="text-sm bg-black text-white my-1 px-4 disabled:bg-opacity-10">Submit</button>
        </form>
      )}
      {comment?.Replies?.length > 0 && (
        <div
          className="text-xs cursor-pointer py-2 px-2 rounded hover:bg-blue-100 text-[#065FC6] w-max"
          onClick={() => {
            setShowReply(!showReply);
          }}
        >
          {comment?.Replies?.length} Replies
        </div>
      )}
      {showReply &&
        comment?.Replies.map((reply) => (
          <Comment key={reply.id} comment={reply} />
        ))}
    </div>
  );
};
