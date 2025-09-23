import { createBrowserRouter } from 'react-router-dom';

import LandingPageSwapper from './LandingPageSwapper';
import HomePage from '../components/HomePage/HomePage';
import NotebooksPage from '../components/NotebookPage/NotebooksPage';
import NotebookPage from '../components/NotebookPage/NotebookPage';
import EntryPage from '../components/EntryPage/EntryPage';
import PublicFeed from '../components/PublicFeedPage/PublicFeed';
import PublicPost from '../components/PublicFeedPage/PublicPost';
import PublicUserPosts from '../components/PublicFeedPage/PublicUserPosts';
import NotFound from '../components/NotFound'
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
        path: '/notebooks',
        element: <NotebooksPage />
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
        path: '*',
        element: <NotFound />
      }
    ],
  },
]);
