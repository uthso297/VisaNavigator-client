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
        loader: () => fetch('http://localhost:5000/visa')
      },
      {
        path: "visa-details/:id",
        element: <VisaDetails></VisaDetails>,
        loader: ({params}) => fetch(`http://localhost:5000/visa/${params.id}`)
      },
      {
        path: "add-visa",
        element: <AddVisa></AddVisa>
      },
      {
        path: "added-visa",
        
      },
      {
        path: "my-visa-application",
      },
      {
        path: "login",
      },
      {
        path: "register",
      }
    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
