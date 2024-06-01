import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import NotebookPage from '../components/NotebookPage/NotebookPage';
import EntryPage from '../components/EntryPage/EntryPage';
import LandingPageSwapper from './LandingPageSwapper';
import NotFound from '../components/NotFound'


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
      {
        path: '*',
        element: <NotFound />
      }
    ],
  },
]);
