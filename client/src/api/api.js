import axios from "axios";
// const fetchPosts = async (page) => {
//     const response = await fetch(
//       `http://localhost:3000/posts?_sort=-id&${
//         page ? `_page=${page}&_per_page=5` : ""
//       }`
//     );

//     if (!response.ok) {
//       throw new Error(`Failed to fetch posts. Status: ${response.status}`);
//     }

//     const postData = await response.json();
//     return postData;
// };

export const signup = async (data) => {
  const response = await axios.post(
    "http://localhost:8080/auth/register",
    data
  );
  return response.data;
};

export const login = async (data) => {
    const response = await axios.post(
      "http://localhost:8080/auth/login",
      data
    );
    return response.data;
  };

  export const getUser = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    
    const response = await axios.get(
      "http://localhost:8080/auth/user",
      config
    );
    return response.data;
  };

  export const getBoards = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    
    const response = await axios.get(
      "http://localhost:8080/board/get",
      config
    );
    return response.data;
  };

  export const getUsers = async () => {
   
    const response = await axios.get(
      "http://localhost:8080/users"
    );
    return response.data;
  };
  
  export const createBoard = async (data) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      
    };
    
    const response = await axios.post(
      "http://localhost:8080/board/create",
      data,
      config
    );
    return response.data;
  };

  export const givePermission = async (data) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      
    };
    
    const response = await axios.post(
      "http://localhost:8080/board/permission",
      data,
      config
    );
    return response.data;
  };