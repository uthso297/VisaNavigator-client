import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root';
import ErrorPages from './ErrorPages';
import Home from './Home';
import AddVisa from './AddVisa';
import AllVisas from './AllVisas';
import VisaDetails from './VisaDetails';
import AuthProvider from './ContextProviders/AuthProvider';
import Register from './Register';
import Login from './Login';
import MyAddedVisas from './MyAddedVisas';
import MyVisasApplication from './MyVisasApplication';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPages></ErrorPages>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "all-visas",
        element: <AllVisas></AllVisas>,
        loader: () => fetch('https://visa-navigator-server-iota.vercel.app/visa')
      },
      {
        path: "visa-details/:id",
        element: <VisaDetails></VisaDetails>,
        loader: ({ params }) => fetch(`https://visa-navigator-server-iota.vercel.app/visa/${params.id}`)
      },
      {
        path: "add-visa",
        element: <AddVisa></AddVisa>
      },
      {
        path: "added-visa",
        element: <MyAddedVisas></MyAddedVisas>

      },
      {
        path: "my-visa-application",
        element: <MyVisasApplication></MyVisasApplication>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      }
    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
