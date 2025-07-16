import Nav from "../../components/nav/Nav";
import { Link } from "react-router-dom";
import "./SignIn.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogIn } from "../../firebase";
import { toast } from "react-toastify";
import Footer from "../../components/footer/Footer";

const SignIn = () => {
  // State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Navigate
  const navigate = useNavigate();

  // Account Login
  const handleAccountLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await handleLogIn(email, password);
      toast.success("Login successful!");
      setEmail("");
      setPassword("");

      // Only navigate on successful login
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      let errorMessage;

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password";
          break;
        default:
          errorMessage = error.message || "Login failed. Please try again";
      }

      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Login Error:", error.code, error.message);
      setLoading(false);
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
                  Please sign-in to your existing Rivus account.
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
                <button className="btn-purple  w-100" type="submit">
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
