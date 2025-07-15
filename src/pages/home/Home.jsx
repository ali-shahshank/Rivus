import "./Home.css";
import "../../index.css";
import Nav from "../../components/nav/Nav";
import Carousel from "../../components/carousel/Carousel";
import Cards from "../../components/cards/Cards";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 p-4">
            <Carousel />
          </div>
          <div className="col-sm-12 col-md-12 px-4 py-2 ">
            <Cards title={"Popular"} category="popular" />
          </div>
          <div className="col-sm-12 col-md-12 px-4  py-2 ">
            <Cards title={"Top Rated"} category="top_rated" />
          </div>
          <div className="col-sm-12 col-md-12 px-4  py-2 ">
            <Cards title={"Now Playing"} category="now_playing" />
          </div>{" "}
          <div className="col-sm-12 col-md-12 px-4  py-2 ">
            <Cards title={"Upcoming"} category="upcoming" />
          </div>
          <div className="col-sm-12 col-md-12 p-4"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
