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

  export const getList = async (boardId) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      
    };
    
    const response = await axios.get(
      `http://localhost:8080/${boardId}/list`,
      config
    );
    return response.data;
  };

  export const dragAndDrop = async (data) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      
    };
    
    const response = await axios.put(
      `http://localhost:8080/card/draganddrop`,
      data,
      config
    );
    return response.data;
  };

  export const createList = async (data) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      
    };
    
    const response = await axios.post(
      `http://localhost:8080/crete/list`,
      data,
      config
    );
    return response.data;
  };

  
  export const createCard = async (data) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      
    };
    
    const response = await axios.post(
      `http://localhost:8080/crete/list/card`,
      data,
      config
    );
    return response.data;
  };

  export const getPermissionUser = async (id) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      
    };
    
    const response = await axios.get(
      `http://localhost:8080/board/${id}/permission`,
      config
    );
    return response.data;
  };

  export const updateCard = async ({update,id}) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      
    };
    
    const response = await axios.put(
      `http://localhost:8080/update/card/${id}`,
      update,
      config
    );
    return response.data;
  };

  // #####################################
  //  Commetns 

  export const getComments = async (cardId) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      
    };
    
    const response = await axios.get(
      `http://localhost:8080/comments/${cardId}`,
      config
    );
    return response.data;
  };

  export const addComment = async (data) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      
    };
  
    const response = await axios.post(
      `http://localhost:8080/create/comment`,
      data,
      config
    );
    return response.data;
  };

  export const addReply = async (data) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      
    };
  
    const response = await axios.post(
      `http://localhost:8080/create/reply`,
      data,
      config
    );
    return response.data;
  };

  export const deleteComment = async (id) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      
    };
  
    const response = await axios.delete(
      `http://localhost:8080/comment/${id}`,
      config
    );
    return response.data;
  };

  export const cardPermission = async (data) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      
    };
  
    const response = await axios.put(
      `http://localhost:8080/cardpermission`,
      data,
      config
    );
    return response.data;
  };