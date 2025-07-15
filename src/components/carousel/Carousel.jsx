import "../../index.css";
import "./Carousel.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// primary component
const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [genres, setGenres] = useState({});
  const navigate = useNavigate();

  // Toggle description expansion
  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Truncate text to 25 words
  const truncateText = (text) => {
    const words = text.split(" ");
    return words.length > 18 ? words.slice(0, 18).join(" ") + "..." : text;
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjZmMmI3ODdiZjc1NTg5OTQzYmEwY2VmNjBjMjVmYiIsIm5iZiI6MTc0OTc0NjI3Ny42MSwic3ViIjoiNjg0YjAyNjViZTA1YWU4ZmIxM2RlZDY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.NRNN4AJgbUtBTIoi01oliTRtqEZFC3y7VZxlenPDNoM",
            },
          }
        );
        const data = await response.json();
        setMovies(data.results.slice(0, 6)); // Get top 5
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingMovies();
  }, []);

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

  // Play trailer navigation
  const handlePlayTrailer = (movieId) => {
    navigate(`/Player/${movieId}`);
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
  // handle error
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div id="mainCarousel" className="carousel slide  " data-bs-ride="carousel">
      {/* Indicators */}
      <div className="carousel-indicators">
        {movies.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#mainCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner rounded-2">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`carousel-item ${index === 0 ? "active" : ""} rounded-2`}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              className="d-block w-100 img-fluid rounded-2"
              alt={movie.title}
            />
            {/* Caption Overlay */}
            <div className="carousel-caption  d-md-block text-start">
              <h2 className="fs-1">{movie.title}</h2>
              <h5 className="text-light fw-light">
                {getFirstGenre(movie.genre_ids)}
              </h5>
              <p className="mb-2">
                {expanded[movie.id]
                  ? movie.overview
                  : truncateText(movie.overview)}
              </p>

              {movie.overview.split(" ").length > 18 && (
                <a
                  onClick={() => toggleExpand(movie.id)}
                  className="nav-link mt-1"
                >
                  {expanded[movie.id] ? "Read Less" : "Read More"}{" "}
                  <i className="bi bi-chevron-right"></i>
                </a>
              )}
              <div className="container p-0 mt-3 ">
                <button
                  className="btn btn-light d-flex justify-content-center align-items-center gap-2"
                  onClick={() => handlePlayTrailer(movie.id)}
                >
                  <i className="bi bi-play-fill"></i> Play Trailer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
