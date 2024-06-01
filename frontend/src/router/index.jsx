import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import LandingPage from '../components/LandingPage/LandingPage';
import NotebookPage from '../components/NotebookPage/NotebookPage';
import EntryPage from '../components/EntryPage/EntryPage';
import LandingPageSwapper from './LandingPageSwapper';


// export const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: "/",
//         element: <LandingPage />,
//       },
//       {
//         path: '/home',
//         element: <HomePage />,
//       },
//       {
//         path: '/notebook/:notebookId',
//         element: <NotebookPage />,
//       },
//       {
//         path: '/notebook/:notebookId/entries/:entryId',
//         element: <EntryPage />,
//       },

//     ],
//   },
// ]);

export const router = createBrowserRouter([
  {
    element: <LandingPageSwapper />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/notebook/:notebookId',
        element: <NotebookPage />,
      },
      {
        path: '/notebook/:notebookId/entries/:entryId',
        element: <EntryPage />,
      },
    ],
  },
]);
