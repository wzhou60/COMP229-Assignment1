//
// This is a simple component that displays a welcome message on HOME Page
// It is used in MainRouter.jsx

//Your Home Page should include some sort of welcome message and link or button that
//allows the user to redirect your About Me Page and / or other pages. I recommend also
// including some sort of Mission Statement.

import './home.css'
export default function Home() {
  return <Welcome />;
}

function Welcome() {
  return (
    <>
      <h2>Hello, My Name is Jackie</h2>
      <p>I am a student at Centennial College</p>
      <Buttons />
    </>
  );
}

function Buttons() {
  return (
    <>
      <button>About Me</button>
    </>
  );
}
