import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment, getComments } from "../api/api";
import { Comment } from "./Comment";
import { FaComments } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useEffect, useState} from "react";
import {EditorState,convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

export const CommentSection = ({ id }) => {
  const [text,setText] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const html = draftToHtml(rawContentState);
    setConvertedContent(html)
    
  }, [editorState]);




  const queryClient = useQueryClient();

  const { data: comments} = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(id),
    retry: false,
  });

  const {mutate,isPending} = useMutation({
    mutationFn: addComment,
    onSuccess: (response)=>{
       toast.success(response?.message)   

       queryClient.invalidateQueries({
        queryKey: ["comments"],
       })

       setEditorState(() =>
       EditorState.createEmpty()
      )
    },
    onError: (err)=>{
      toast.error(err.response.data.message);
    }
  })

  

  

  const handleSubmit = (e)=>{
    e.preventDefault();
    mutate({text:convertedContent,cardId:id})
  }
  
  return (
    <>
    <div className="mt-4 flex gap-2 items-center">
    <FaComments />
      Comments
      </div>
    <div className="bg-white py-2 px-4 mt-2 ">
      {/* <form className="flex flex-col gap-2 my-4" onSubmit={handleSubmit}> */}
        <Editor  editorState={editorState}
        onEditorStateChange={setEditorState} />
        <button onClick={handleSubmit} disabled={isPending} type="submit" className="bg-blue-500 text-white text-sm py-1 px-4 w-max disabled:bg-blue-200 ">Comment</button>
      {/* </form> */}
      <div className=" h-28 overflow-y-scroll">
      {comments?.comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
      </div>
    </div>
    </>
  );

};

{/* <input onChange={(e)=>{setText(e.target.value)}} value={text} type="text" placeholder="Add a Comment" className="border px-1 py-2 text-xs outline-none"  /> */}