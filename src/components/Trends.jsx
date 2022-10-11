import axios from "axios";
import React, { Fragment, useContext, useState } from "react";
import { useEffect } from "react";
import { Container } from "./NavBar";
import { AiOutlineClose, AiFillPlayCircle } from "react-icons/ai";
import NoImg from "./NoImage.jpg";
import "../Styles/Videos.css";
import TrailerTrends from "../Trailers/TrailerTrends";

function Trends() {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;
  const Shown = input ? "search" : "discover";
  const Api = "https://api.themoviedb.org/3";
  const TrendsShown = "/trending/all/week";
  const [trendsArray, setTrendArray] = useState([]);
  const [trendTitle, setTrendTitle] = useState("");
  const [trailer, setTrailer] = useState(true);
  const apiImageAddress = "https://image.tmdb.org/t/p/";

  const Trends = async () => {
    const data = await axios.get(`${Api}${TrendsShown}`, {
      params: {
        api_key: "89e6737d6edec588bddb03c4a212fbb9",
        query: input,
      },
    });
    const results = data.data.results;
    setTrendArray(results);
  };

  useEffect(() => {
    setTimeout(() => {
      Trends();
    }, 100);
  }, [input]);
  // console.log(trendsArray);

  const TrendTitle = (trend) => {
    setTrendTitle(trend.title);
    setTrailer(!trailer);
  };

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {trendsArray.map((trend) => {
            return (
              <Fragment>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    color="#ffa6c9"
                    fontSize={40}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => TrendTitle(trend)}
                  />
                  <img
                    src={
                      trend.poster_path
                        ? `${apiImageAddress}w500${trend.poster_path}`
                        : NoImg
                    }
                    alt="movie_picture"
                    onClick={() => TrendTitle(trend)}
                  />
                  <h3
                    id="smaller-Text"
                    className={toggle ? "mainColor" : "secondaryColor"}
                  >
                    {trend.title}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? console.log : <TrailerTrends TrendTitle={trendTitle} toggle={toggle}/>}

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

export default Trends;
