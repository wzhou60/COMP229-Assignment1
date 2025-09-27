import './service.css'

export default function Service() {
  return (
    <>
      <div className="content-boxServices">
        <h2>Services</h2>

        <p className="serviceText"> I specialize in building modern, scalable, and user-friendly applications.
          Here are some of the services I offer:</p>

        <div className="serviceBox">
          <h3>General Programming</h3>
          <p> I am proficient in several programming languages including C#, Python, and Java.
            I can help you with software development, and mobile app development.</p>
          <img src="/assets/genprog.jpg" alt="" />
        </div>


        <div className="serviceBox">
          <h3>Web Development</h3>
          <p> I can create responsive and visually appealing websites using HTML, CSS, and JavaScript.
            I have experience with popular frameworks like React, Express, and Node.js.</p>
          <img src="/assets/webdev.png" alt="" />
        </div>
        <div className="serviceBox"> <h3>Database Management</h3>
          <p> I can design and manage databases using SQL and NoSQL technologies.
            I have experience with Oracle's SQL Developer, and MongoDB.</p>
          <img src="/assets/sql.jpg" alt="" />

        </div>


      </div>
    </>
  );
}
