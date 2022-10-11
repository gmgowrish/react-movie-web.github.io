import React, { Fragment } from "react";
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import "../Styles/NavBarStyle.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Movies from "./Movies";
import TvShows from "./TvShows";
import Trending from "./Trends";
// import Pricing from "./About";
import About from "./About";
export const Container = React.createContext();
function NavBar() {
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState('')
  // console.log(toggle)
  return (
    <Container.Provider value={{toggle , inputValue}}>
      <Fragment>
        <nav className={toggle ? "" : "navBarColor"}>
          <div className="nav-options">
            <h1 id={toggle ? "" : "heading"}>REACTFLIX</h1>
            <NavLink
              to=""
              style={({ isActive }) => {
                return { color: isActive ? "#fff" : "#EE9B00" };
              }}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}>MOVIES</span>
            </NavLink>
            <NavLink
              to="/TvShows"
              style={({ isActive }) => {
                return { color: isActive ? "#fff" : "#EE9B00" };
              }}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}>TvShows</span>
            </NavLink>
            <NavLink
              to="/Trending"
              style={({ isActive }) => {
                return { color: isActive ? "#fff" : "#EE9B00" };
              }}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}>Trending</span>
            </NavLink>
            <NavLink
              to="/About"
              style={({ isActive }) => {
                return { color: isActive ? "#fff" : "#EE9B00" };
              }}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}>About</span>
            </NavLink>
          </div><br /><br />
          <div className="input-group" >
            <input type="text" placeholder="Search Whatever You Want" onChange={(e) => setInputValue(e.target.value)}/>
            <HiSearch fontSize={30} color={toggle ? 'black' : '#ff206e'} id="search" />
            <div id="Color-switcher" onClick={() => setToggle(!toggle)}>
              <div
                id={toggle ? "Color-switcher-mover" : "Color-switcher-moved"}
              ></div>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="" element={<Movies />} />
          <Route path="TvShows" element={<TvShows />} />
          <Route path="Trending" element={<Trending />} />
          <Route path="About" element={<About />} />
        </Routes>
      </Fragment>
    </Container.Provider>
  );
}

export default NavBar;
