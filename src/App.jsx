import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminBanners from "./components/Admin/AdminBanners";
import AdminCategories from "./components/Admin/AdminCategories";
import UserProfile from "./components/User/UserProfile";
import UserJobs from "./components/User/UserJobs";
import UserNavBar from "./components/User/UserNavBar";
import UserNewVendor from "./components/User/UserNewVendor";
import VendorJobs from "./components/Vendor/VendorJobs";
import VendorApplications from "./components/Vendor/VendorApplications";
import VendorSideDrawer from "./components/Vendor/VendorSideDrawer";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import AdminSideDrawer from "./components/Admin/AdminSideDrawer";
import ViewerNavBar from "./components/Viewer/ViewerNavBar";
import UserHomePage from "./components/User/UserHomePage";
import ViewerHomePage from "./components/Viewer/ViewerHomePage";
import AdminHomepage from "./components/Admin/AdminHomepage";
import UserProfileEditable from "./components/User/UserProfileEditable";
import UserAppliedJobs from "./components/User/UserAppliedJobs";
import UserProfileViewable from "./components/User/UserProfileViewable";
import UserViewSingleJob from "./components/User/UserViewSingleJob";
import UserJobsByCategory from "./components/User/UserJobsByCategory";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log(token);
  console.log(role);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable={true}
        pauseOnHover
        theme="light"
      />

      <Routes>
        <>
          <Route
            path="/admin"
            element={<AdminSideDrawer anotherItem={<AdminHomepage />} />}
          />
          <Route
            path="/admin/categories"
            element={<AdminSideDrawer anotherItem={<AdminCategories />} />}
          />
          <Route
            path="/admin/banners"
            element={<AdminSideDrawer anotherItem={<AdminBanners />} />}
          />
        </>

        <>
          <Route
            path="/vendor"
            element={<VendorSideDrawer anotherItem={<VendorApplications />} />}
          />
          <Route
            path="/vendor/applications"
            element={<VendorSideDrawer anotherItem={<VendorApplications />} />}
          />
          <Route
            path="/vendor/jobs"
            element={<VendorSideDrawer anotherItem={<VendorJobs />} />}
          />
        </>

        <>
          <Route
            path="/user"
            element={<UserNavBar anotherItem={<UserHomePage />} />}
          />
          <Route
            path="/user/jobs"
            element={<UserNavBar anotherItem={<UserJobs />} />}
          />
          <Route
            path="/user/jobs/category/:id"
            element={<UserNavBar anotherItem={<UserJobsByCategory />} />}
          />
          <Route
            path="/user/profile"
            element={
              <UserNavBar
                anotherItem={
                  <UserProfile childItem={<UserProfileViewable />} />
                }
              />
            }
          />
          <Route
            path="/user/profile/edit-profile"
            element={
              <UserNavBar
                anotherItem={
                  <UserProfile childItem={<UserProfileEditable />} />
                }
              />
            }
          />
          <Route
            path="/user/profile/applied-jobs"
            element={
              <UserNavBar
                anotherItem={<UserProfile childItem={<UserAppliedJobs />} />}
              />
            }
          />
          <Route
            path="/user/new-vendor"
            element={<UserNavBar anotherItem={<UserNewVendor />} />}
          />
          <Route
            path="/user/single-job/:id"
            element={<UserNavBar anotherItem={<UserViewSingleJob />} />}
          />
        </>

        <Route
          path="/"
          element={<ViewerNavBar anotherItem={<ViewerHomePage />} />}
        />
        <Route
          path="/login"
          element={<ViewerNavBar anotherItem={<LoginPage />} />}
        />
        <Route
          path="/signup"
          element={<ViewerNavBar anotherItem={<SignupPage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
