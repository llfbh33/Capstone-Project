import { createBrowserRouter } from 'react-router-dom';
<<<<<<< HEAD

import LandingPageSwapper from './LandingPageSwapper';
=======
>>>>>>> 6284ff2c8ce9df06d22eb1d4115c1d64d5b8abb2
import HomePage from '../components/HomePage/HomePage';
import NotebookPage from '../components/NotebookPage/NotebookPage';
import EntryPage from '../components/EntryPage/EntryPage';
import PublicFeed from '../components/PublicFeedPage/PublicFeed';
import PublicPost from '../components/PublicFeedPage/PublicPost';
import PublicUserPosts from '../components/PublicFeedPage/PublicUserPosts';
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
        path: '/public',
        element: <PublicFeed />,
      },
      {
        path: '/public/:postId',
        element: <PublicPost />,
      },
      {
        path: '/public/user',
        element: <PublicUserPosts />,
      },
      {
        path: '*',
        element: <NotFound />
      }
    ],
  },
]);
