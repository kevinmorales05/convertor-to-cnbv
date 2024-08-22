import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import {useContext} from 'react';
import { Context } from "../../context/Context";
import { capitalizeFirstLetter } from "../../utils/utils.ts";

export default function Dashboard() {
  const context: any = useContext(Context);
  let username =  capitalizeFirstLetter(context.username);
  return (
    <div className="App dashboard">
      <h1>Dashboard</h1>
      <p>Bienvenido <span className="user-name">{username}</span> !</p>
      <div className="links-block">
        <button className="btn">
          <Link className="link" to="/convertCNBV">
            Servicios CBNV
          </Link>
        </button>
        <button className="btn">
          <Link className="link" to="/convertCondusef">
            Servicios CONDUSEF
          </Link>
        </button>
      </div>
    </div>
  );
}
