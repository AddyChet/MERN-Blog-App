import Body from "./Components/Body";
import Navbar from "./Components/Navbar";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { FaSpinner } from "react-icons/fa";
import Editor from "./Pages/Editor";
import SearchPage from "./Components/SearchPage";
import { EditorContext } from "./context/EditorContext";


const App = () => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();
  const hideNavbarOn = ["/editor/publish"]; // add any path where navbar shouldn't show
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  
 
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <FaSpinner size={30} className="animate-spin" />
      </div>
    );
  }




  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <div className={!shouldHideNavbar ? "pt-17" : ""}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/editor/*" element={<Editor />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/"
            element={user ? <Body /> : <Navigate to="/login" />}
          />

          <Route path="/search/:query" element={<SearchPage />} />
        </Routes>
      </div>

      <ToastContainer />
    </>
  );
};

export default App;
