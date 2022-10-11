import axios from "axios";
import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiFillPlayCircle , AiOutlineClose } from "react-icons/ai";
import { Container } from "./NavBar";
import NoImg from "./NoImage.jpg";
import "../Styles/Videos.css";
import { useContext } from "react";
import TrailerMovies from "../Trailers/TrailerMovies";

function Movies() {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;
  const [moviesData, setMoviesData] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [moviesTitle, setMoviesTitle] =useState('')
  const Shown = input ? "search" : "discover";
  const Api = `https://api.themoviedb.org/3/${Shown}/movie`;
  const apiImageAddress = "https://image.tmdb.org/t/p/";

  const MovieCall = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: "89e6737d6edec588bddb03c4a212fbb9",
        query: input,
      },
    });
    const results = data.data.results;
    setMoviesData(results);
  };
  useEffect(() => {
    setTimeout(() =>{
      MovieCall();

    }, 100)
    
  }, [input]);
  // console.log(moviesData);
  const MoviesTitle = (movie)  => {
     setMoviesTitle(movie.title)
     setTrailer(!trailer)
  }
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {moviesData.map((movie) => {
            return (
              <Fragment>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    color="#ffa6c9"
                    fontSize={40}
                    id={trailer ? 'playIcon' : 'hide'} onClick={() => MoviesTitle(movie)}
                  />
                  <img
                    src={
                      movie.poster_path
                        ? `${apiImageAddress}w500${movie.poster_path}`
                        : NoImg
                    }
                    alt="movie_picture" onClick={() => MoviesTitle(movie)}
                  />
                  <h3 id={movie.title.length > 2 ? "smaller-Text" : " "}>
                    {movie.title}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? console.log : <TrailerMovies moviesTitle={moviesTitle}/>}
          <AiOutlineClose
            id={trailer ? "Nothing" : "Exit1"}
            className={toggle ? "DarkTheme" : "LightThemeClose"}
            fontSize={35}
            cursor={"pointer"}
            onClick={() => setTrailer(true)}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Movies;

// className={toggle ? 'DarkTheme' : 'LightTheme'}
