import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import "../../index.css";

const Nav = () => {
  // Navigate
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-md p-2 p-md-4">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src="/Logo.png"
              alt=""
              className="img-fluid"
              style={{ height: "40px" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            data-bs-toggle="offcanvas"
            data-bs-target="#offCanvas"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ">
              <li className="nav-item text-light">
                <Link to="/movies" className="nav-link">
                  Movies
                </Link>
              </li>
              <li className="nav-item text-light">
                <Link to="/series" className="nav-link">
                  Series
                </Link>
              </li>

              <li className="nav-item text-light">
                <Link to="/new" className="nav-link">
                  New Releases
                </Link>
              </li>
              <li className="nav-item text-light">
                <Link to="/Player" className="nav-link">
                  Player
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav d-flex justify-content-center align-items-center gap-2 ms-auto ">
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={() => {
                    navigate("/SignIn");
                  }}
                >
                  Sign In
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn-purple"
                  onClick={() => navigate("/SignUp")}
                >
                  Try Now
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offCanvas"
        aria-labelledby="offcanvas"
      >
        <div className="offcanvas-header p-4">
          <button
            type="button"
            className="btn-close btn-close-white border-0 rounded-circle"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column justify-content-between ">
          <ul className="list-unstyled">
            <li className="nav-item p-2">
              <a href="" className="nav-link">
                Movies
              </a>
            </li>
            <li className="nav-item p-2">
              <a href="" className="nav-link">
                Series
              </a>
            </li>
            <li className="nav-item p-2">
              <a href="" className="nav-link">
                New Releases
              </a>
            </li>
            <li className="nav-item p-2">
              <a href="" className="nav-link">
                Documentaries
              </a>
            </li>
            <li className="nav-item p-2">
              <a href="" className="nav-link">
                Watch-list
              </a>
            </li>
          </ul>
          <ul className="list-unstyled">
            <li className="nav-item py-2">
              <button className="btn btn-light w-100">Sign-In</button>
            </li>
            <li className="nav-item py-2">
              <button className="btn-purple w-100">Try Now</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;
