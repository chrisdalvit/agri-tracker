import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router";

import { GlobalMenu } from "./components/GlobalMenu"
import { OrchardGrid } from './components/OrchardGrid';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalMenu><OrchardGrid /></GlobalMenu>
  }
]);

root.render(
  <RouterProvider router={router} />,
);