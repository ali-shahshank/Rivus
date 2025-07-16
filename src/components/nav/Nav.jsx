import "./Nav.css";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, handleSignOut } from "../../firebase";
import { toast } from "react-toastify";

const Nav = () => {
  // Navigate
  const navigate = useNavigate();

  // State Variables
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await handleSignOut();
      toast.success("Account Logged Out");
      navigate("/SignIn");
    } catch (error) {
      setError(error);
      toast.error("Logout failed");
    }
  };

  // handle loading
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    toast.error(error);
    console.log(error.message);
  }

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
                <a
                  href="https://www.themoviedb.org/"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TMDB
                </a>
              </li>
              <li className="nav-item text-light">
                <a
                  href="https://www.rottentomatoes.com/"
                  target="_blank"
                  className="nav-link"
                  rel="noopener noreferrer"
                >
                  Rotten Tomatoes
                </a>
              </li>

              <li className="nav-item text-light">
                <a
                  href="https://www.imdb.com/"
                  className="nav-link"
                  target="_blank"
                >
                  IMDB
                </a>
              </li>
              <li className="nav-item text-light">
                <a
                  href="https://www.metacritic.com/"
                  target="_blank"
                  className="nav-link"
                >
                  Metacritics
                </a>
              </li>
            </ul>
            <ul className="navbar-nav d-flex justify-content-center align-items-center gap-2 ms-auto ">
              {user ? (
                <li className="nav-item">
                  <button className="btn-purple w-100" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light"
                      onClick={() => navigate("/SignIn")}
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
                </>
              )}
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
              <Link to="/movies" className="nav-link">
                Movies
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link to="/series" className="nav-link">
                Series
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link to="/new" className="nav-link">
                New Releases
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link to="/Player" className="nav-link">
                Player
              </Link>
            </li>
          </ul>

          <ul className="list-unstyled">
            {user ? (
              <li className="nav-item py-2">
                <button className="btn-purple w-100" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item py-2">
                  <button
                    className="btn btn-light w-100"
                    onClick={() => navigate("/SignIn")}
                  >
                    Sign-In
                  </button>
                </li>
                <li className="nav-item py-2">
                  <button
                    className="btn-purple w-100"
                    onClick={() => navigate("/SignUp")}
                  >
                    Try Now
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;
