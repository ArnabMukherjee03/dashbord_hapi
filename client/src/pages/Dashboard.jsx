import { useState } from "react";
import { Board } from "../components/Board";
import { Navbar } from "../components/Navbar";
import { CreateBoard } from "../components/CreateBoard";
import { useQuery,useMutation } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { getBoards, getUsers, givePermission } from "../api/api";
import { toast } from 'react-toastify';

export const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [permission, setPermission] = useState(null);
  const [permissionData, setPermissionData] = useState([]);
  const [filter, setFilter] = useState(null);

  const {
    data: boards,
  } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
    retry: false,
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    retry: false,
  });



  const handleChange = (e) => {
    let filter;
    e.target.value
      ? (filter = users?.users?.filter((user) =>
          user?.email.includes(e.target.value)
        ))
      : "";
    setFilter(filter);
  };

  const deletePermission = (value) => {
    const data = permissionData.filter((data) => data.id !== value);
    setPermissionData(data);
  };

  const {mutate,isPending} = useMutation({
    mutationFn: givePermission,
    onSuccess: (response)=>{
       toast.success(response?.message)  
       setPermission(null)
       setPermissionData([])
       setFilter(null)
    },
    onError: (err)=>{
      toast.error(err.response.data.message);
    }
  })

  const giveAccess = ()=>{
     const datas = permissionData.map(data=>{return {
         boardId: permission,
         userId: data.id
     }})

     mutate({permission: datas,boardId: permission})
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <div className="relative px-20 py-12">
        <h1 className="text-xl">👤 Your Boards</h1>
        {/* all the boards are mapped here */}
        <div className="flex  pt-8 flex-wrap gap-8">
          {boards?.boards?.map((board) => {
            return (
              <div className="relative" key={board?.id}>
                <Board
                  data={board}
                  setPermission={() =>
                    setPermission(permission === board?.id ? null : board?.id)
                  }
                  className="text-xl text-white" 
                />
                {permission === board.id && (
                  <div className="absolute right-[-250px] z-50 top-[-10px] w-60 px-2 py-4 shadow-md border  bg-white">
                    <div className="w-full text-xs text-center">
                      {board?.name}
                    </div>
                    <div className="mt-4">
                      {permissionData?.map((data) => {
                        return (
                          <div key={data?.id} className="flex justify-between">
                            <p>{data?.email}</p>
                            <MdDelete
                              onClick={() => deletePermission(data?.id)}
                              className="text-red-500 cursor-pointer"
                            />
                          </div>
                        );
                      })}
                      <label htmlFor="user" className="mb-2">
                        Email
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        id="user"
                        className="outline-none border w-full px-1"
                      />
                      {filter?.map((data) => {
                        return (
                          <div
                            onClick={() =>
                              setPermissionData([...permissionData, data])
                            }
                            className=" cursor-pointer"
                            key={data.id}
                          >
                            {data.email}
                          </div>
                        );
                      })}
                    </div>
                    <div onClick={giveAccess} className={`w-full text-xs mt-2 bg-black text-white py-1 text-center cursor-pointer ${isPending?"opacity-5":""}`}>
                      Give Access
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <Board
            onClick={() => setShow(!show)}
            className="text-lg flex items-center justify-center text-black"
            data={{ name: "create new board" }}
          />
          {show && <CreateBoard onClick={() => setShow(false)} />}
        </div>
      </div>
    </>
  );
};
