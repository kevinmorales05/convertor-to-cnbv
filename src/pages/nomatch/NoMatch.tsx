import React from "react";
import { Link } from "react-router-dom";

export default function NoMatch() {
  return (
    <div>
      <h1>Page not found!</h1>
      <Link to="/login" >Go Login</Link>
    </div>
  );
}
