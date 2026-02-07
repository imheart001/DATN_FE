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
import LayoutAdmin from "./Layout/LayoutAdmin/LayoutAdmin";
import ListFilm from "./pages/Admin/ListFilm/ListFilm";
import ListCate from "./pages/Admin/Category/ListCategory";
import ListCinema from "./pages/Admin/Cinemas/ListCinema";
import ListShow from "./pages/Admin/Quản Lí suất chiếu/ListShow";
import ListTime from "./pages/time/listTime";
import TimeCinemas from "./pages/Clients/timeCinemas/TimeCinemas";

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
          path: "/movie_about/:id",
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
        {

          path: "/admin/listcate",
          element: <ListCate />,
        },
        {
          path: "/admin/cinema",
          element: <ListCinema />,
        },
        {
          path: "/admin/show",
          element: <ListShow />,
        },
        {
          path: "/admin/time",
          element: <ListTime />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
