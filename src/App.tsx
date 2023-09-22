import './App.css';
import Add from './Containers/Add';
import List from './Containers/List';
import Login from './Containers/Login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/add",
      element: <Add />,
    },
    {
      path: "/list",
      element: <List />,
    },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;
