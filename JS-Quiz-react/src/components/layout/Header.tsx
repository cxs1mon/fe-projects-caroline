import "./Header.css"
import React from "react";

export default function Header() {
  if (window.location.pathname === "/quiz") {
    return (
      <div>
        <h1 className="title" style={{marginBottom: "0"}}>
          <a href="/" aria-description="Title to reset Quiz">
            The custom Quiz!
          </a>
        </h1>
        <a href="/" aria-description="Title to reset Quiz" id="reset" title="Reset Quz and go to Start Page">
          &#10226;
        </a>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="title">
          <a href="/" aria-description="Title to reset Quiz">
            The custom Quiz!
          </a>
        </h1>
      </div>
    );
  }
}
