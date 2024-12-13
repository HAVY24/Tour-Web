import Home from "../Pages/Home/Home";
import Tour from "../Pages/Tour/MainTour/Tour";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Gallery from "../Pages/Gallery/Gallery";
import Sponsor from "../Pages/Sponsor/Sponsor";
import { Route, Routes, useLocation } from "react-router-dom";
import SignIn from "../Auth/Sign In/SignIn";
import SignUp from "../Auth/Sign Up/SignUp";
import { useEffect, useState, useContext } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import CreateTourPage from "../Pages/Tour/CreateTourAndPackage/CreateTourPage/CreateTourPage";
import DetailPage from "../Pages/Tour/Detail";
import Profile from "../User/UserProfile/Profile";
import Blog from "../Pages/Blog/Blog";
import CreatePost from "../Pages/Post/CreatePost";
import UpdatePost from "../Pages/Post/UpdatePost";
import NorthTour from "../Pages/Tour/DomesticTour/NorthTour";
import MiddleTour from "../Pages/Tour/DomesticTour/MiddleTour";
import SouthTour from "../Pages/Tour/DomesticTour/SouthTour";
import AsiaTour from "../Pages/Tour/InternationalTour/AsiaTour";
import EuropeTour from "../Pages/Tour/InternationalTour/EuropeTour";
import AmericaTour from "../Pages/Tour/InternationalTour/AmericaTour";
import PostDetail from "../Pages/Post/BlogPostDetail";
import NotFoundPage from "../../view/NotFoundPage";
import AccountPage from "../Pages/Account/AccountPage";
import CreateTourPackage from "../Pages/Tour/CreateTourAndPackage/CreatePackagePage/CreateTourPakage";
import UserContext from "../../UserContext";
import BookingPage from "../Pages/Booking/BookingPage/BookingPage";
import UserManagementPage from "../Admin/UserManagement/UserManagement";
import UserBookingPage from "../Pages/Booking/BookingDetailPage/UserBookingInfo";
import PaymentPage from "../Pages/Payment/PaymentPage/PaymentPage";
import AddPaymemt from "../Pages/Payment/AddPaymentPage/AddPayment";
import QRPaymentPage from "../Pages/Payment/QRPage/QRPaymentPage";
import ScrollToTop from "./ScrollToTop";
import MyBookingPage from "../Pages/Booking/MyBookingPage/MyBookingPage";
import Billing from "../Pages/Billing/Billing";
import UserRequest from "../Admin/UserRequest/UserRequest";
import DeletedPostsPage from "../Pages/Post/DeletedPostPage";
import TourManagement from "../Admin/TourManagement/TourManagement";
import UpdateTourPage from "../Pages/Tour/UpdateTour/UpdateTourPage";
import DeletedTourPage from "../Pages/Tour/DeletedTour/DeletedTourPage";
import BlockedProfilePage from "../../view/BlockedProfilePage";
import BookingChart from "../Admin/StatisticPage/BookingStatistics/BookingChart";
import PostChart from "../Admin/StatisticPage/PostStatistics/PostChart";
import RegisterChart from "../Admin/StatisticPage/RegisterStatistics/RegisterChart";
import PaymentChart from "../Admin/StatisticPage/PaymentStatistics/PaymentChart";
import RevenueChart from "../Admin/StatisticPage/RevenueStatistics/RevenueChart";
import StatisticsPage from "../Admin/StatisticPage/StatisticPage";
import RevenueYearChart from "../Admin/StatisticPage/RevenueStatistics/RevenueYearChart";
import TourAndPackageDetails from "../Admin/TourManagement/TourAndPackageDetails";
import PostManagement from "../Admin/PostManagement/PostManagement";
import PostPreview from "../Pages/Post/PostPreview";
import ResetPassword from "../Auth/ResetPasswordPage";

function Navigation() {
  const location = useLocation();
  const [showArrow, setShowArrow] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        {user.role == "admin" && (
          <>
            <Route path="/createTour" element={<CreateTourPage />} />
            <Route path="/createTourPackage" element={<CreateTourPackage />} />
            <Route path="/userManagement" element={<UserManagementPage />} />
            <Route path="/tour/manage" element={<TourManagement />} />
            <Route path="/tour/delete/:userId" element={<DeletedTourPage />} />
            <Route path="/tour/update/:tourId" element={<UpdateTourPage />} />
            <Route path="/user/request" element={<UserRequest />} />
            <Route path="/user/request/post" element={<PostManagement />} />
          </>
        )}

        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/statistics/revenue/year" element={<RevenueYearChart />} />
        <Route path="/statistics/booking/:year" element={<BookingChart />} />
        <Route path="/statistics/post/:year" element={<PostChart />} />
        <Route path="/statistics/register/:year" element={<RegisterChart />} />
        <Route path="/statistics/payment/:year" element={<PaymentChart />} />
        <Route path="/statistics/revenue/:year" element={<RevenueChart />} />

        <Route path="/restore/password" element={<ResetPassword />} />
        <Route
          path="/admin/tour/detal/:tourId"
          element={<TourAndPackageDetails />}
        />

        <Route path="/profile/block" element={<BlockedProfilePage />} />
        <Route path="/create/post" element={<CreatePost />} />
        <Route path="/NorthSide" element={<NorthTour />} />
        <Route path="/SouthSide" element={<SouthTour />} />
        <Route path="/EastSide" element={<MiddleTour />} />
        <Route path="/AsiaTour" element={<AsiaTour />} />
        <Route path="/AmericaTour" element={<AmericaTour />} />
        <Route path="/EuropeTour" element={<EuropeTour />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/post/preview" element={<PostPreview />} />
        <Route path="/payment/add" element={<AddPaymemt />} />
        <Route path="/user/booking" element={<MyBookingPage />} />
        <Route path="/QR/:bookingId" element={<QRPaymentPage />} />
        <Route path="/payment/:bookingId" element={<PaymentPage />} />
        <Route path="/booking/:tourPackageId" element={<BookingPage />} />
        <Route path="/account/:userId" element={<AccountPage />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/detail/:tourId" element={<DetailPage />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/post/delete/:userId" element={<DeletedPostsPage />} />
        <Route
          path="/traveler/info/:tourPackageId"
          element={<UserBookingPage />}
        />
        <Route path="/update/post/:postId" element={<UpdatePost />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {showArrow && (
        <button
          onClick={handleScrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px",
            borderRadius: "50%",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            cursor: "pointer",
            zIndex: "1000",
          }}
        >
          <ArrowCircleUpIcon color="primary" fontSize="large" />
        </button>
      )}
    </>
  );
}

export default Navigation;
