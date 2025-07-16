import Nav from "../../components/nav/Nav";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../../components/footer/Footer";
import "./SignUp.css";
import { handleSignUp } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Primary Function
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Navigate
  const navigate = useNavigate();

  // Handle Account Registration
  const handleAccountRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await handleSignUp(name, email, password);
      toast.success("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      let errorMessage;

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "An account with this email already exists";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters long";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Email/password accounts are not enabled";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later";
          break;
        default:
          errorMessage =
            error.message || "Registration failed. Please try again";
      }

      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Registration Error:", error.code, error.message);
    } finally {
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
          <div className="col-sm-12 col-md-12 p-4 p-md-4 d-flex justify-content-center align-items-center ">
            <form
              action="POST"
              onSubmit={handleAccountRegistration}
              className="p-4 w-100 w-md-50 rounded-4 surface-element shadow-sm purple-border "
              id="signup-form"
            >
              <div className="container-fluid mb-4 px-0 ">
                <h3 className="fs-5">Account Registration</h3>
                <p className="fs-6 text-secondary">
                  Please register for a new account.
                </p>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="name@example.com"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label htmlFor="floatingEmail">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="container mb-4 px-0">
                <div className="form-check">
                  <input
                    className="form-check-input "
                    type="checkbox"
                    value=""
                    id="checkDefault"
                    required
                  />
                  <label
                    className="form-check-label text-light"
                    htmlFor="checkDefault"
                  >
                    <small>
                      By signing up, you agree to our
                      <Link className="text-decoration-underline text-light ms-1">
                        terms & conditions
                      </Link>
                      , and{" "}
                      <Link className="text-decoration-underline text-light">
                        privacy policy.
                      </Link>
                    </small>
                  </label>
                </div>
              </div>
              <div className="container px-0 mb-4">
                <button className=" btn-purple  w-100" type="submit">
                  Create Account
                </button>
              </div>
              <div className="container px-0">
                <p className="text-center">
                  <small className="text-light ">
                    Already have an account ?
                    <Link
                      to="/SignIn"
                      className="fw-bold text-decoration-underline text-light ms-1"
                    >
                      Sign In
                    </Link>
                  </small>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
