import React, { Fragment } from "react";
import axios from "axios";
import { AiFillPlayCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";
import { useState } from "react";
import { Container } from "./NavBar";
import "../Styles/Videos.css";
import NoImg from "./NoImage.jpg";
import { useContext } from "react";
import TrailerTvShows from "../Trailers/TrailerTvShows";

function TvShows() {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;
  const [title, setTitle] = useState('');
  const [showData, setShowData] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const Shown = input ? "search" : "discover";
  const Api = `https://api.themoviedb.org/3/${Shown}/tv`;
  const apiImageAddress = "https://image.tmdb.org/t/p/";

  const TvShows = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: "89e6737d6edec588bddb03c4a212fbb9",
        query: input,
      },
    });
    const results = data.data.results;
    setShowData(results);
  };
  useEffect(() => {
    setTimeout(() =>{
      TvShows();
    },100)
    
  }, [input]);
  console.log(showData);
  const TvShowTitle = (shows) => {
    setTitle(shows.name);
    setTrailer(!trailer);
  };
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {showData.map((shows) => {
            return (
              <Fragment key={shows.id}>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    color="#ffa6c9"
                    fontSize={40}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => TvShowTitle(shows)}
                  />
                  <img
                    src={
                      shows.poster_path
                        ? `${apiImageAddress}w500${shows.poster_path}`
                        : NoImg
                    }
                    alt="movie_picture"
                    onClick={() => TvShowTitle(shows)}
                  />
                  <h3
                    id={shows.name.length > 28 ? "smaller-Text" : " "}
                    className={toggle ? "mainColor" : "secondaryColor"}
                  >
                    {shows.name}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? console.log : <TrailerTvShows TvShowsTitle={title} toggle={toggle}/>}
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

export default TvShows;
