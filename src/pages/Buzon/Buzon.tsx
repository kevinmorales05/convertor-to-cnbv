import React from "react";
import "./Buzon.css";
import { useForm } from "react-hook-form";
import { ReporteAnonimo } from "../../types/types";
import { sendReport } from "../../services/minds/minds.ts";
import { useNavigate } from "react-router-dom";

export default function Buzon() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const nuevoReporte: ReporteAnonimo = {
      Reporte: data.Reporte,
      ComentariosOC: data.ComentariosOC,
      DatosPersona: data.DatosPersona,
      Fecha: new Date(),
    };
    let response = await sendReport(nuevoReporte);
    console.log("response desde componente ", response);
    if (response.code === "01") {
      alert("Reporte enviado de manera exitosa!");
      navigate("/login");
    }
    else {
        alert("Hubo un error al subir un nuevo reporte anónimo!");
    }

    // let user = await loginReune({
    //   username: data.username,
    //   password: data.password,
    // });
    // //console.log("desde el cliente", user);
    // if (user.code === 101) {
    //   console.log("error message", user.msg);
    //   alert(user.msg);
    // }
    // console.log("this is the user ", user);
    // if (user.token_access) {
    //   console.log("this is the token access! ", user.token_access);
    //   setToken(user.token_access);
    //   setUsername(user.username);
    //   setLogged(true);
    //   navigate("/dashboard");
    // }
  };
  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Crear un reporte anónimo</h1>

        <input
          className="input"
          {...register("Reporte", { required: true })}
          placeholder="Asunto"
        />
        {errors.Reporte && <span>Este campo es requerido</span>}
        <input
          className="input"
          {...register("DatosPersona", { required: false })}
          placeholder="Datos persona denunciada"
        />
        <textarea
          {...register("ComentariosOC", { required: true })}
          placeholder="Descripción del incidente"
          className="input"
          rows={10}
        ></textarea>
        {errors.ComentariosOC && <span>Este campo es requerido</span>}

        <input className="btn" type="submit" />
      </form>
    </div>
  );
}
