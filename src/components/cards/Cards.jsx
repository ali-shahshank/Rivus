import "./Cards.css";
import "../../index.css";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Cards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState({});
  const [error, setError] = useState(null);
  const cardsRef = useRef();

  // Fetch Card Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjZmMmI3ODdiZjc1NTg5OTQzYmEwY2VmNjBjMjVmYiIsIm5iZiI6MTc0OTc0NjI3Ny42MSwic3ViIjoiNjg0YjAyNjViZTA1YWU4ZmIxM2RlZDY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.NRNN4AJgbUtBTIoi01oliTRtqEZFC3y7VZxlenPDNoM",
          },
        };
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${
            category || "now_playing"
          }?language=en-US&page=1`,
          options
        );

        if (!res.ok) throw new Error(error.message);
        const data = await res.json();

        setApiData(data.results || []);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  // Fetch Genre
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjZmMmI3ODdiZjc1NTg5OTQzYmEwY2VmNjBjMjVmYiIsIm5iZiI6MTc0OTc0NjI3Ny42MSwic3ViIjoiNjg0YjAyNjViZTA1YWU4ZmIxM2RlZDY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.NRNN4AJgbUtBTIoi01oliTRtqEZFC3y7VZxlenPDNoM",
          },
        };

        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
          options
        );

        if (!res.ok) throw new Error("Failed to fetch genres");
        const data = await res.json();

        // Create genre lookup object
        const genreMap = {};
        data.genres.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });

        setGenres(genreMap);
      } catch (err) {
        console.error("Genre fetch error:", err);
      }
    };

    fetchGenres();
  }, []);

  // Helper function to convert genre_ids to names
  const getFirstGenre = (genreIds) => {
    return genreIds?.[0] ? genres[genreIds[0]] || "Unknown" : "Unknown";
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
    return <div className="alert alert-danger">Error:{error}</div>;
  }

  return (
    <>
      {/* Category */}
      <div className="heading-container pt-2 pt-md-4 pb-2 ">
        <h5 className="fs-6 fw-medium">{title ? title : "Popular"}</h5>
      </div>
      {/* Cards */}
      <div
        className="col-sm-12 col-md-12 p-0 overflow-x-auto"
        id="cards-wrapper"
      >
        <div
          className="d-flex flex-nowrap gap-3 p-0"
          id="cards-container"
          ref={cardsRef}
        >
          {apiData.map((card, index) => {
            return (
              <Link to={`/Player/${card.id}`} key={index} className="nav-link">
                {/* Card*/}
                <div className="card">
                  <div className="card-image">
                    <img
                      src={
                        `https://image.tmdb.org/t/p/w400` + card.backdrop_path
                      }
                      alt="movie poster"
                      className="img-fluid"
                    />
                  </div>
                  <div className="card-text">
                    <div className="card-title  p-0">{card.original_title}</div>
                    <div className="card-text text-secondary  p-0">
                      {getFirstGenre(card.genre_ids)}
                      {" - "}
                      {card.release_date
                        ? new Date(card.release_date).getFullYear()
                        : card.first_air_date
                        ? new Date(card.first_air_date).getFullYear()
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Cards;
