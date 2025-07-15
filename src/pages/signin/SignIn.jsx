import Nav from "../../components/nav/Nav";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import "./SignIn.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogIn } from "../../firebase";

const SignIn = () => {
  // State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Navigate
  const navigate = useNavigate();

  // Handle Login
  const handleAccountLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await handleLogIn(email, password);
      alert("Login Successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      const clearError = error.code.replace("/Auth", "").replace(/-/g, " ");
      setError(clearError);
      console.log(error);
      alert(error.message);
    }
  };

  // Handle Load State
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div
          className="spinner-border text-primary position-absolute top-50 start-50"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Handle Error
  if (error) {
    return <div className="alert alert-danger fade">Alert:{error}</div>;
  }

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 p-2 p-md-4">
            <div className="container p-2"></div>
          </div>
          <div className="col-sm-12 col-md-12 p-4 p-md-4 d-flex justify-content-center align-items-center ">
            <form
              action="POST"
              onSubmit={handleAccountLogin}
              className="p-4 w-100 w-md-50 rounded-4 surface-element shadow-sm purple-border "
              id="signup-form"
            >
              <div className="container-fluid mb-4 px-0">
                <h3 className="fs-5">Account Sign-In</h3>
                <p className="fs-6 text-secondary">
                  Please sign-in to your existing Revus account.
                </p>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label htmlFor="floatingEmail">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="container px-0 mb-4">
                <button
                  className="btn-purple  w-100"
                  onClick={handleAccountLogin}
                >
                  Sign-In
                </button>
              </div>
              <div className="container px-0">
                <p className="text-center">
                  <small className="text-light ">
                    Don't have an account yet ?
                    <Link
                      to="/signup"
                      className="fw-bold text-decoration-underline text-light ms-1"
                    >
                      Sign-Up
                    </Link>
                  </small>
                </p>
              </div>
            </form>
          </div>
          <div className="col-sm-12 col-md-12 p-2 p-md-4 ">
            <div className="container p-2"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
