import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router";

import { GlobalMenu } from "./components/GlobalMenu"
import { OrchardsPage } from './components/OrchardsPage';
import { LoginPage } from './components/LoginPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Autheticated } from './components/Autheticated';
import { CookiesProvider } from 'react-cookie';
import { OrchardPage } from './components/OrchardPage';
import { WorkerPage } from './components/WorkerPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient()
let router = createBrowserRouter([
  {
    path: "/",
    element: <Autheticated><GlobalMenu /></Autheticated>,
    children: [
      {
        path: "/orchards",
        element: <OrchardsPage />
      },
      {
        path: "/orchards/:id",
        element: <OrchardPage />
      }, 
      {
        path: "/workers",
        element: <WorkerPage />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
]);

root.render(
  <QueryClientProvider client={queryClient}>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </QueryClientProvider>
);