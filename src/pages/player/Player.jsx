import "./Player.css";
import "../../index.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/nav/Nav";

const Player = () => {
  const [apiData, setApiData] = useState({
    key: "",
    name: "",
    published_at: "",
    type: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjZmMmI3ODdiZjc1NTg5OTQzYmEwY2VmNjBjMjVmYiIsIm5iZiI6MTc0OTc0NjI3Ny42MSwic3ViIjoiNjg0YjAyNjViZTA1YWU4ZmIxM2RlZDY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.NRNN4AJgbUtBTIoi01oliTRtqEZFC3y7VZxlenPDNoM",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("No movie ID provided");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );

        if (!response.ok) {
          throw new Error("Failed to fetch video data");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          throw new Error("No trailers available for this movie");
        }

        // Find YouTube trailer, fallback to first video
        const trailer =
          data.results.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
          ) || data.results[0];

        setApiData(trailer);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]); // Add dependency array

  if (isLoading) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <Nav />
      <div className="col-sm-12 col-md-12 px-2 px-md-4 ">
        <div className="container-fluid px-2 ">
          {" "}
          <iframe
            src={`https://www.youtube.com/embed/${apiData.key}`}
            frameBorder="0"
            allowFullScreen
            width="100%"
            height="500"
            title={apiData.name}
          />
          {/* <div className="container-fluid py-4">
            {" "}
            <ul className="list-unstyled d-flex justify-content-around">
              <li>
                <strong>Published:</strong> {apiData.published_at?.slice(0, 10)}
              </li>
              <li>
                <strong>Title:</strong> {apiData.name}
              </li>
              <li>
                <strong>Type:</strong> {apiData.type}
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Player;
