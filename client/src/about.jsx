// Page component for the About page
// It is used in MainRouter.jsx
//

/* Your About Me Page should include your legal name, an image of you (I recommend a head and shoulder shot),
 a short paragraph about who you are. Keep this clean and simple as it may be viewed by perspective employers.
Your About Me page should include a link to a PDF version of your Resume. */

import "./about.css";

export default function About() {
  return (
    <>
      <Info />
    </>
  );
}

function Info() {
  return (
    <>
      <div className="content-box">
        <h2>About Me</h2>
        <img src="src/assets/jackie.png" alt="Picture of me" width={216} height={291} />
        <h3>Wen Feng (Jackie) Zhou</h3>
        <p>
          I am a student at Centennial College. I am currently in the 3rd semester of the Software
          Engineering Technology program. I am interested in software development and this website
          is to show my portfolio and display what skills I have.
        </p>

        <div className="resume">
          <p> Here is the link to my resume: </p>
          <a href="src/assets/Resume.pdf" download>
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
}
