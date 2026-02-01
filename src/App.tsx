import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutUser from "./Layout/LayoutUser/LayoutUser";
import HomePages from "./pages/Clients/Homepages/home";
import BookingSeat from "./pages/Clients/TICKET - SEAT LAYOUT/seat";
import Cinema from "./pages/Clients/Cinema/Cinema";
import Orther from "./pages/Clients/Orther/Orther";
import Movie_About from "./pages/Clients/MOVIE-ABOUT/Movie-About";
import Ticket from "./pages/Clients/TICKET/Ticket";
import Movies from "./pages/Clients/Movies/Movies";
import F_B from "./pages/Clients/F&B/F&B";
import Login from "./pages/Clients/Login/Login";
<<<<<<< Updated upstream
import LayoutAdmin from "./Layout/LayoutAdmin/LayoutAdmin";
import ListFilm from "./pages/Admin/ListFilm/ListFilm";
=======
import Dasboard from "./pages/Admin/Dasboard";
import LayoutAdmin from "./pages/Admin/Component/Layout";
import AdminCategory from "./pages/Admin/Page/admin/Category/AdminCategory";
import AdminFilm from "./pages/Admin/Page/admin/Film/AdminFilm";
import AdminAdd from "./pages/Admin/Page/admin/Category/AdminAdd";
>>>>>>> Stashed changes

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutUser />,
      children: [
        {
          path: "/",
          element: <HomePages />,
        },
        {
          path: "/book-ticket",
          element: <BookingSeat />,
        },
        {
          path: "/movie_about",
          element: <Movie_About />,
        },
        {
          path: "/ticket",
          element: <Ticket />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/F&B",
          element: <F_B />,
        },
        {
          path: "/cinema",
          element: <Cinema />,
        },
        {
          path: "/orther",
          element: <Orther />,
        },
        {
          path: "/dasboard",
          element: <Dasboard />,
        },
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      children: [
        {
          path: "/admin/listfilm",
          element: <ListFilm />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: '/admin', element: <LayoutAdmin />,
      children : [
        {
          path : 'category', element: <AdminCategory />
        },
        {
          path: 'addCate', element : <AdminAdd />
        },
        {
          path : 'film' ,element : <AdminFilm />
        }
      ]
      
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
