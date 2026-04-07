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
import { useEffect } from "react";
import ListCate from "./pages/Admin/Category/ListCategory";
import ListCinema from "./pages/Admin/Cinemas/ListCinema";
import ListShow from "./pages/Admin/Quản Lí suất chiếu/ListShow";
import ListBookTicket from "./pages/Admin/Book-Ticket/ListBookTicket";
import ListMovieRoom from "./pages/Admin/MovieRoom/ListMovieRoom";
import ListFood from "./pages/Admin/Food/ListFood";
import ListCateDetail from "./pages/Admin/CateDetail/ListCateDetail";

import ListTime from "./pages/Admin/time/listTime";

import { setSelectedCinema } from "./components/CinemaSlice/selectedCinemaSlice";
import { updateToken, setUserId } from "./components/CinemaSlice/authSlice";
import { useDispatch } from "react-redux";
import Payment from "./pages/Clients/Payment/Payment";

import ChoosePop from "./pages/Clients/ChoosePop/ChoosePop";
import TicketBookingDetails from "./pages/Clients/Ticket-booking-details/TicketBookingDetails";
import Dashbroad from "./pages/Admin/Dashbroad/Dashbroad";
import PaymentMomo from "./pages/Clients/Payment/PaymentMomo";

import ListVouchers from "./pages/Admin/Vouchers/ListVouchers";
import ForgotPassword from "./pages/Clients/Forgot-password";
import ResetPassword from "./pages/Clients/Reset-password/reset-password";
import NotFound from "./pages/Clients/NotFoundPages/NotFound";
import LayoutProfile from "./Layout/LayoutUser/LayoutProfile";
import Profile from "./pages/Clients/Profile/Profile";
import BookTicketUser from "./pages/Clients/BookTicketUser/BookTicketUser";
import ListUser from "./pages/Admin/User/ListUser";

import MemberInfo from "./pages/Clients/member-info/member-info";
import MemberInfoAdmin from "./pages/Admin/Members/Members";

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
          path: "/member-info",
          element: <MemberInfo />,
        },
        {
          path: "/book-ticket/:id",
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
        {
          path: "/choosepop",
          element: <ChoosePop />,
        },
        {
          path: "/Tiketbookingdetail",
          element: <TicketBookingDetails />,
        },
        {
          path: "/info_account",
          element: <LayoutProfile />,
          children: [
            {
              path: "", // Đường dẫn mặc định khi truy cập /info_account
              element: <Profile />,
            },
            {
              path: "profile", // Đường dẫn mặc định khi truy cập /info_account
              element: <Profile />,
            },
            {
              path: "BookTicketUser",
              element: <BookTicketUser />,
            },
          ],
        },
      ],
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
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
          path: "members",
          element: <MemberInfoAdmin />,
        },
        {
          path: "/admin/vouchers",
          element: <ListVouchers />,
        },
        {
          index: true,
          element: <Dashbroad />,
        },
        {
          path: "/admin/book_ticket",
          element: <ListBookTicket />,
        },
        {
          path: "/admin/listcate",
          element: <ListCate />,
        },
        {
          path: "/admin/time",
          element: <ListTime />,
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
          path: "/admin/movieroom",
          element: <ListMovieRoom />,
        },
        {
          path: "/admin/food",
          element: <ListFood />,
        },
        {
          path: "/admin/category_detail",
          element: <ListCateDetail />,
        },
        {
          path: "/admin/user",
          element: <ListUser />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/payment/:id_code",
      element: <Payment />,
    },
    {
      path: "/PayMentMoMo/:id_code",
      element: <PaymentMomo />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutDuration = 1000 * 60 * 60; // 10 seconds

    const timeoutCallback = async () => {
      try {
        // Dispatch the actions and wait for them to complete
        await Promise.all([
          dispatch(setSelectedCinema(null)),
          dispatch(updateToken(null)),
          dispatch(setUserId(null)),
          localStorage.clear(),
        ]);

        // Once both actions are completed, navigate to the root path
        window.location.href = "/";
      } catch (error) {
        // Handle any potential errors
        console.error("Error during dispatch:", error);
      }
    };

    const timeoutId = setInterval(timeoutCallback, timeoutDuration);

    return () => {
      clearInterval(timeoutId);
    };
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
