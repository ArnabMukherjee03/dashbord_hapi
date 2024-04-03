import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getUser } from "../api/api";
import { useEffect } from "react";

export const Navbar = () => {
  const {
    data,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false
  });


   useEffect(()=>{
     if(isError){
        toast.error(error?.response?.data?.message);
     }
   },[isError,error])

   if(isLoading){
    return <h1>Loading</h1>
   }

  return (
    <nav className="px-20 py-2 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a className="text-xl">Dashboard</a>
        </div>
        <div className="flex gap-4 items-center">
          <div className="">Hello {data?.user?.name}</div>
          <div className="bg-black w-10 h-10 rounded-[50%] overflow-hidden">
              <img className="w-full bg-contain " src="https://bellfund.ca/wp-content/uploads/2018/03/demo-user.jpg" alt={data?.user?.name} />
          </div>
        </div>
      </div>
    </nav>
  );
};
