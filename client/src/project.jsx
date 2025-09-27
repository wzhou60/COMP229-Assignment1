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
            Developed a personal portfolio website using React and Vite to showcase my projects and
            skills.
          </p>
          <img src="src/assets/project1.png" alt="" width={700} height={450} />
        </div>

        <div className="project">
          <h3>Project 2: Restaurant Website</h3>
          <p>
            Created a restaurant website using HTML, CSS, and JavaScript. The website features a
            menu, ordering system, and contact form. Ensured the website is mobile-friendly and easy
            to navigate.
          </p>

          <img src="src/assets/project2.png" alt="" width={700} height={450} />
        </div>

        <div className="project">
          <h3>Project 3: Minecraft Mod</h3>
          <p>
            Built a Minecraft mod using Java and the Minecraft Forge API. The mod alters enemy AI to
            be more aggressive.
          </p>
          <img src="src/assets/project3.png" alt="" width={700} height={450} />
        </div>
      </div>
    </>
  );
}
