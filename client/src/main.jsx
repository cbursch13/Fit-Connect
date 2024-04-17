import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Home from './pages/Home';
import About from './pages/About';
import TrainerClasses from './pages/TrainerClasses.jsx';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OrderHistory from './pages/OrderHistory';
import Success from './pages/Success';
import Trainers from './pages/Trainers';
import Courses from './pages/Courses.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/orderHistory',
        element: <OrderHistory />
      }, {
        path: '/trainers',
        element: <Trainers />
      }, {
        path: '/trainers/:instructorID',
        element: <TrainerClasses />
      }, {
        path: '/courses',
        element: <Courses />
      }, {
        path: '/success',
        element: <Success />
      },
      {
        path: '/trainers',
        element: <Trainers />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
