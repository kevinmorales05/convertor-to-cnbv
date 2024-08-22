import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginReune } from "../../services/condusef/condusef.ts";
import { useContext } from "react";
import { Context } from "../../context/Context.js";

export default function Login(props) {
  const { setToken, setUsername } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { setLogged } = props;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    let user = await loginReune({
      username: data.username,
      password: data.password,
    });
    //console.log("desde el cliente", user);
    if (user.code === 101) {
      console.log("error message", user.msg);
      alert(user.msg);
    }
    console.log("this is the user ", user);
    if (user.token_access) {
      console.log("this is the token access! ", user.token_access);
      setToken(user.token_access);
      setUsername(user.username);
      setLogged(true);
      navigate("/dashboard");
    }
  };

  return (
    <div className="App login">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Inicio de Sesión</h1>

        <input
          className="input"
          {...register("username", { required: true })}
          placeholder="Nombre del usuario"
        />
        {errors.username && <span>Este campo es requerido</span>}

        <input
          className="input"
          type="password"
          {...register("password", { required: true })}
          placeholder="Contraseña"
        />

        {errors.password && <span>Este campo es requerido</span>}

        <input className="btn" type="submit" />
      </form>
    </div>
  );
}
