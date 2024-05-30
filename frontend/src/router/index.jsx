import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import LandingPage from '../components/LandingPage/LandingPage';
import NotebookPage from '../components/NotebookPage/NotebookPage';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/notebook/:notebookId',
        element: <NotebookPage />,
      },

    ],
  },
]);
