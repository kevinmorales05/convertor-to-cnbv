import {
  ConsultaReune,
  ReclamacionReune,
  AclaracionesReune,
  UserReune,
} from "../../types/types";

let condusefUrl = "https://api-reune-pruebas.condusef.gob.mx";//process.env.condusef_url;
let urlLogin = "http://localhost:3000/api/refreshToken";

export async function sendConsultasCondusef(consultas: ConsultaReune[]) {}

export async function sendAclaraciones(aclaraciones: AclaracionesReune[]) {}

export async function sendReclamaciones(reclamaciones: ReclamacionReune[]) {}

export async function loginReune(user: UserReune) {
  try {
    const response = await fetch(`${urlLogin}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(user), // Aunque esto es inusual en GET
      });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if(data.code === 101){

        return data;
    }
    
    console.log("response data ", data.user.token_access);
    return data.user;
  } catch (error) {
    console.error("Error al momento de realizar el inicio de sesión: ", error);
    throw error;
  }
}
