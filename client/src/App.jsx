import {Routes,Route} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import { Boards } from "./pages/Boards";

function App() {
  
  return (
  <>
     <ToastContainer/>
     <Routes>
       <Route path="/" Component={Dashboard}/>
       <Route path="/register" Component={Signup}/>
       <Route path="/login" Component={Login}/>
       <Route path="/board/:id" Component={Boards}/>
    </Routes>
  </>
  )
}

export default App
