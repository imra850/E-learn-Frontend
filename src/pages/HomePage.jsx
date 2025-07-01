import { Outlet } from "react-router";
import CustNavbar from "../Component/Navbar";
import { Toaster } from "react-hot-toast";

const HomePage=()=>{
    return <div>
           
      <Toaster />
      <CustNavbar/>
     
        <div>
         <Outlet/>
         </div>
    </div>
}

export default HomePage;