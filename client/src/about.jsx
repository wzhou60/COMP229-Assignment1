// Page component for the About page
// It is used in MainRouter.jsx
//
/* Your About Me Page should include your legal name, an image of you (I recommend a head and shoulder shot),
 a short paragraph about who you are. Keep this clean and simple as it may be viewed by perspective employers.
Your About Me page should include a link to a PDF version of your Resume. */

import "./about.css";
import EducationList from "./EducationList.jsx";
import ProjectList from "./ProjectList.jsx";

export default function About() {
  return (
    <>
      <Info />

      <EducationList/>
            <ProjectList/>

    </>
  );
}

function Info() {
  return (
    <>
      <h2 className="about-header">About Me</h2>
      <div className="content-boxAbout">
        <img src="/assets/jackie.png" alt="Picture of me" />
        <h3>Wen Feng (Jackie) Zhou</h3>
        <p>
          I am a student at Centennial College. I am currently in the 3rd semester of the Software
          Engineering Technology program. I am interested in software development and this website
          is to show my portfolio and display what skills I have.
        </p>

        <div className="resume">
          <p> Here is the link to my resume: </p>
          <button>
            {" "}
            <a href="/assets/Resume.pdf" target="_blank">
              Download Resume
            </a>
          </button>
        </div>
      </div>
    </>
  );
}
