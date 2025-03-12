import "./Header.css"
export default function Header() {
  if (window.location.pathname === "/quiz") {
    return (
      <>
        <h1 className="title" style={{marginBottom: "0"}}>
          <a href="/" aria-description="Title to reset Quiz">
            The custom Quiz!
          </a>
        </h1>
        <a href="/" aria-description="Title to reset Quiz" id="reset" title="Reset Quz and go to Start Page">
          &#10226;
        </a>
      </>
    );
  } else {
    return (
      <>
        <h1 className="title">
          <a href="/" aria-description="Title to reset Quiz">
            The custom Quiz!
          </a>
        </h1>
      </>
    );
  }
}
