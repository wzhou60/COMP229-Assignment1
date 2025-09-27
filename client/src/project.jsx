import "./project.css";

export default function Project() {
  return (
    <>
      <Projects />;
    </>
  );
}

function Projects() {
  return (
    <>
      <div className="content-boxProject">
        <h2>My Projects</h2>
        <div className="project">
          <h3>Project 1: Personal Portfolio Website</h3>
          <p>
            This is a solo project. Where I am developing a personal portfolio website using React and Vite to showcase my projects and
            skills.
          </p>
          <img src="/assets/project1.png" alt="" width={700} height={450} />
        </div>

        <div className="project">
          <h3>Project 2: Restaurant Website</h3>
          <p>
            This was another solo project, where I created a restaurant website using HTML, CSS, and JavaScript. The website features a
            menu, ordering system, and contact form and was designed to insure the website is mobile-friendly and easy
            to navigate.
          </p>

          <img src="/assets/project2.png" alt="" width={700} height={450} />
        </div>

        <div className="project">
          <h3>Project 3: Minecraft Mod</h3>
          <p>
            This was technically a solo project where I ported a mod from an older minecraft version using Java and the Minecraft Forge API. 
            The mod alters enemy AI to be more aggressive. I just fixed a few errors in the mod so that it works in a newer minecraft version.

          </p>
          <img src="/assets/project3.png" alt="" width={700} height={450} />
        </div>
      </div>
    </>
  );
}
