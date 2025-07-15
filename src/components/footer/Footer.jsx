import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  // Navigate
  const navigate = useNavigate();
  // Date
  const date = new Date().getFullYear();
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className=" col-sm-12 col-md-12 p-4 d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-start align-items-md-center">
            <img
              src="/TMDB.png"
              alt=""
              onClick={() => {
                navigate("/");
              }}
            />
            <p className=" text-secondary mt-2 mt-md-0">
              All Rights Reserved Rivus &copy; {date}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
