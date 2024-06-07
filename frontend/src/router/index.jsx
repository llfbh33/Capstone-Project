import { createBrowserRouter } from 'react-router-dom';

import LandingPageSwapper from './LandingPageSwapper';
import HomePage from '../components/HomePage/HomePage';
import NotebookPage from '../components/NotebookPage/NotebookPage';
import EntryPage from '../components/EntryPage/EntryPage';
import PublicFeed from '../components/PublicFeedPage/PublicFeed';
import PublicPost from '../components/PublicFeedPage/PublicPost';
import PublicUserPosts from '../components/PublicFeedPage/PublicUserPosts';
import NotFound from '../components/NotFound'
import LoadingPage from '../components/LoadingPage';
import CommentsPage from '../components/CommentsPage/CommentsPage';


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
        path: '/comments',
        element: <CommentsPage />,
      },
      {
        path: '/loading',
        element: <LoadingPage />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ],
  },
]);
