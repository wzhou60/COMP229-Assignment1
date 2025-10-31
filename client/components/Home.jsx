//
// This is a simple component that displays a welcome message on HOME Page
// It is used in MainRouter.jsx

//Your Home Page should include some sort of welcome message and link or button that
//allows the user to redirect your About Me Page and / or other pages. I recommend also
// including some sort of Mission Statement.

import { Link } from "react-router-dom"; //use link for the button to go to other pages
import "./home.css";

export default function Home() {
  return <Welcome />;
}

function Welcome() {
  return (
    <>
      <div className="welcomeMessage">
        <h2>Hello, My Name is Jackie</h2>
        <p>
          I am a student at Centennial College and I am currently in the 3rd semester of the
          Software Engineering Technology program.
        </p>
        <div className="missionStatement">
          <h3>Mission Statement</h3>
          <p>
            To continuously learn and improve my skills in software development, and to contribute
            to the tech community through innovative projects and collaboration.
          </p>
        </div>
      </div>
      <Buttons />
    </>
  );
}

//button to about me page
function Buttons() {
  return (
    <>
      <Link to="/about">
        <button className="home-aboutButton">About Me</button>
      </Link>
    </>
  );
}
