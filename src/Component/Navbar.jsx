
import { Button, DarkThemeToggle, Navbar } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const CustNavbar=()=>{

  const { isLogin, login, logout, user } = useAuth();


  const [loginLinks, setLoginLinks] = useState([
    {
      name: "Dashbaord",
      link: "/dashboard/home",
    },
    ,
    {
      name: "Profile",
      link: `/dashboard/profile`,
    },
  ]);

  const [links,setlinks]=useState([
    {name:"Home",link:"/"},
    {name:"About",link:"/about"},
    

    {name:"Courses",link:"/courses"},
   
  ])
  return (
    <Navbar className="shadow-md fixed w-full z-50 top-0">
      <Navbar.Brand href="https://flowbite-react.com">
        {/* <img src="../e-learning.jpg" className="rounded-full mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">E-Learn</span>
      </Navbar.Brand>
      <div className="flex gap-2 md:order-2">
      {!isLogin() && (
          <>
            <Link to={"/login"}>
              <Button pill size="sm" color="blue">
                Login
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button size="sm" pill color="purple">
                Signup
              </Button>
            </Link>
          </>
        )}

{isLogin() && (
          <>
            <Button
              as={Link}
              to={"/dashboard/profile"}
              size="sm"
              pill
              color="blue"
            >
              {user.name}
            </Button>
            <Button
              onClick={() => {
                logout();
              }}
              size="sm"
              pill
              color="purple"
            >
              Logout
            </Button>
          </>
        )}
        
        <DarkThemeToggle/>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {!isLogin() &&
          links.map((link, index) => (
            <Navbar.Link as={Link} key={index} to={link.link}>
              {/* <Link to={"/"}>Home</Link> */}
              {link.name}
            </Navbar.Link>
          ))}

        {isLogin() &&
          loginLinks.map((link, index) => (
            <Navbar.Link as={Link} key={index} to={link.link}>
              {/* <Link to={"/"}>Home</Link> */}
              {link.name}
            </Navbar.Link>
          ))}
      </Navbar.Collapse>
    </Navbar>
  );
    }
    
export default CustNavbar;