import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Courses from './pages/Courses.jsx';
import Categories from './pages/Categories.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Services from './pages/Services.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import ProtectedRoute from './Component/ProtectedRoute.jsx';
import Dashboard from './pages/Protected/Dashboard.jsx';
import Profile from './pages/Protected/Profile.jsx';
import DashboardHome from './pages/Protected/DashboardHome.jsx';
import AdminProtectedRoute from './Component/AdminProtectedRoute.jsx';
import AddCategory from './pages/Admin/AddCategory.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import AdminHomePage from './pages/Admin/AdminHomePage.jsx';
import AddCourse from './pages/Admin/AddCourse.jsx';
import { Provider } from 'react-redux';
import store from './store/index.js';
import AllCategories from './pages/Admin/AllCategories.jsx';
import AllCourses from './pages/Admin/AllCourses.jsx';
import UploadVideo from './pages/Admin/UploadVideo.jsx';
import SingleCourseView from './pages/SingleCourseView.jsx';
import Order from './Component/Guest/Order.jsx';
import Store from './pages/Protected/Store.jsx';
import MyCourses from './pages/Protected/MyCourses.jsx';
import Learning from './pages/Protected/Learning.jsx';
import AllOrders from './pages/Admin/AllOrders.jsx';
import AllUsers from './pages/Admin/AllUsers.jsx';

const router=createBrowserRouter([
  {
    path: "/",
    element: (<AuthProvider>
        <HomePage/>
    </AuthProvider>),
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "",
        element: <App/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/courses",
        element: <Courses/>
      },
      {
        path: "/courses/:courseId",
        element: <SingleCourseView/>
      },

      {
        path: "/categories",
        element: <Categories/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup/>
      },
      {
        path: "/services",
        element: <Services/>
      },
      {
        path:"/learning/:courseId",
        element: <Learning/>
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute element={Dashboard}/>,
        children: [
          {
            path: "home",
            element: <DashboardHome />,
          },
          {
            path: "profile",
            element: <ProtectedRoute element={Profile} />,
          },
          {
            path:"order/:courseId",
            element: <Order/>,
          },
          {
            path: "store",
            element: <Store/>
          },
          {
            path: "myCourses",
            element: <MyCourses/>
          }
        ],
      },
      {
        path: "/admin",
        element: <AdminProtectedRoute element={AdminDashboard} />,
        children: [
          {
            path: "home",
            element: <AdminHomePage/>
          },
          {
            path: "add-category",
            element: <AddCategory/>
          },
          {
            path: "add-course",
            element: <AddCourse/>
          },
          {
            path: "categories",
            element: <AllCategories/>
          },
          {
            path: "courses",
            element: <AllCourses/>
          },
          {
            path: "upload-video",
            element: <UploadVideo/>
          },
          {
            path: "all-orders",
            element: <AllOrders/>
          },
          {
            path: "all-users",
            element: <AllUsers/>
          },


        ]
      }
     
    ]
  }
])

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Provider store={store}>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
    </Provider>
  </StrictMode>,
)
