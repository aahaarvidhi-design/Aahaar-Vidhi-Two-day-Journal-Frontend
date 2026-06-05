import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();

  const handleLogout = () => {

    logout();
    navigate("/login");

  };

  return (

    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm"
    >

      <div className="container-fluid">

        <Link
          className="navbar-brand fw-bold"
          to="/home"
        >
          Aahaar Vidhi
        </Link>

        <div className="d-flex align-items-center">

          {/* Hide navigation links on mobile */}
          <div className="d-none d-md-flex">

            <Link
              className={`nav-link text-white me-3 ${
                location.pathname.includes("/home")
                  ? "fw-bold"
                  : ""
              }`}
              to="/home"
            >
              Home
            </Link>

            <Link
              className={`nav-link text-white me-3 ${
                location.pathname.includes("/assessment")
                  ? "fw-bold"
                  : ""
              }`}
              to="/assessment"
            >
              Constitution
            </Link>

            <Link
              className={`nav-link text-white me-3 ${
                location.pathname.includes("/journal")
                  ? "fw-bold"
                  : ""
              }`}
              to="/journal"
            >
              Journal
            </Link>

          </div>

          <button
            className="btn btn-light btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>

  );
};

export default Navbar;