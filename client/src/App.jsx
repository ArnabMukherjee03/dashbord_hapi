import {Routes,Route} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";

function App() {
  
  return (
  <>
     <ToastContainer/>
     <Routes>
       <Route path="/" Component={Dashboard}/>
       <Route path="/register" Component={Signup}/>
       <Route path="/login" Component={Login}/>
    </Routes>
  </>
  )
}

export default App
