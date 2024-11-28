import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProblemPage from './pages/ProblemPage';
import ProblemsListingPage from './pages/ProblemsListingsPage';
import UserProfilePage from './pages/UserProfilePage';
import UserSubmissionsListingPage from './pages/UserSubmissionsListingPage';
import ProblemSubmissionsListingsPage from './pages/ProblemSubmissionsListingsPage';
import SubmissionPage from './pages/SubmissionPage';
import ServerErrorPage from './pages/ServerErrorPage';
import AddNewProblemPage from './pages/AddNewProblemPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} errorElement={<ServerErrorPage /> } >
        <Route index element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/my-profile' element={<UserProfilePage />} />
        <Route path='/problems' element={<ProblemsListingPage />} />
        <Route path='/problems/:id' element={<ProblemPage />} />
        <Route path='/problems/add' element={<AddNewProblemPage />} />
        <Route path='/submissions' element={<UserSubmissionsListingPage />} />
        <Route path='/submissions/question/:id' element={<ProblemSubmissionsListingsPage />} />
        <Route path='/submissions/:id' element={<SubmissionPage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
