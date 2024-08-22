import React from "react";
import logo from "../../assets/logos/LOGO-KUHNIPAY-B.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("logging out!");
    props.setLogged(false);
    navigate("/login");
  };
  return (
    <div className="header-block">
      <img src={logo} alt="Logo Kuhnipay" className="header-logo" />
      <h1 className="header-title">Sistemas Internos</h1>
      {props.logged === true ? (
        <>
          <button className="btn-logout" onClick={handleClick}>Cerrar Sesión</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
