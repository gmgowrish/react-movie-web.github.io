import React from "react";
import wave from "./img/hiiiii.png";
import me from "./img/me.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/index1.css";

function About() {
  return (
    <div className="content ">
      <main>
        <div>
          <h1>
            Hi <img src={wave} alt="wave" width={50} />
          </h1>
          <h1>
            I'm <strong>G M G</strong>owrish
          </h1>
          <h1>
            <b>U</b>nder <b>G</b>uideness of Miss:<strong>Naga Suma</strong>C V
          </h1>
          <h1>
            HOD of{" "}
            <i>
              <b>BCA</b>
            </i>
          </h1>
          <p>
            I design and develop experience that make people lives simpler
            through web. I am working with a Html,Css,JavaScript, Python, Cyber
            security
          </p>
        </div>
        <div className="buttons">
          <a href="https://medium.com/bingewave/building-a-live-streaming-movie-app-live-tv-website-part-1-d0857aaac8ea#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImNhYWJmNjkwODE5MTYxNmE5MDhhMTM4OTIyMGE5NzViM2MwZmJjYTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjI5MTU1NzUsImF1ZCI6IjIxNjI5NjAzNTgzNC1rMWs2cWUwNjBzMnRwMmEyamFtNGxqZGNtczAwc3R0Zy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNDkzMzMzNDc3NTM4MTQyNTY3OCIsImVtYWlsIjoiZ21nZ293cmlzaDcwMTk5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJpYXQiOjE2NjI5MTU4NzUsImV4cCI6MTY2MjkxOTQ3NSwianRpIjoiMjA1NWIwMDYwYzlkOWJhNDcxMGU5ODVhM2JlOWYyZWI1NmIyMzQyOSJ9.sD2qAkYvFO78DnkMhtSm7Wu_ttVpjP3zya19WaEpzyxeZGpy8qnejFKRjMpXbQof8bfPlUSTj9ISO-Cq_fCPT1zefi9ZeYQZHt0RRBzEw3F1uwyoYl7VX7o5dthZX4G7q_WQ1DyEUYtvS88RC8uFHP_CTI-PcXMTRLZME6oT0fTdhS2xX0X4cjrJI43YovTHTDGW-eNlYPWxp1fDngSPQ1DuUDwEOnd79uPZBPFGA6s62n8lSnfkrkM73-qhhYeXwUbsp1VBYJemKXm0RyQJXUUSL7FbBkUVDepgqUM-jZXyeTrF1xUWN5cOQMU4pPK1nYv5Mo-_dqJIjeMhKft9pg" target='blank'>
            <button className="cta hire">HIRE ME</button>
          </a>
          <a href="https://github.com/gmgowrish" target="blank">
            <button className="cta project"> SEE MY PROJECTS</button>
          </a>
        </div>
      </main>
      <figure>
        <img src={me} alt="Photo as dead" className="me-img" />
        <div className="img bg"></div>
      </figure>
    </div>
  );
}

export default About;
