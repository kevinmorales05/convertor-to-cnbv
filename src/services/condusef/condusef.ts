import {
  ConsultaReune,
  ReclamacionReune,
  AclaracionesReune,
  UserReune,
} from "../../types/types";

let condusefUrl = "https://api-reune-pruebas.condusef.gob.mx";//process.env.condusef_url;
let urlLogin = "http://localhost:3000/api/refreshToken";

export async function sendConsultasCondusef(consultas: ConsultaReune[], token:string) {
  try {
    const response = await fetch(`${condusefUrl}/reune/consultas/general`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(consultas),

    });
    console.log(response);
    if(response.ok){
      console.log("The response was successfull!");
      return await response.json();
    }
    else {
      return await response.json();
    }

  } catch (error) {
    console.log('Consultas error ', error);
    return error;
  }

}

export async function sendAclaraciones(aclaraciones: AclaracionesReune[], token:string) {
  try {
    const response = await fetch(`${condusefUrl}/reune/reclamaciones/general`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(aclaraciones),

    });
    console.log(response);
    if(response.ok){
      console.log("The response was successfull!");
      return await response.json();
    }
    else {
      return await response.json();
    }

  } catch (error) {
    console.log('Aclaraciones error ', error);
    return error;
  }
}

export async function sendReclamaciones(reclamaciones: ReclamacionReune[], token:string) {
  try {
    const response = await fetch(`${condusefUrl}/reune/aclaraciones/general`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(reclamaciones),

    });
    console.log(response);
    if(response.ok){
      console.log("The response was successfull!");
      return await response.json();
    }
    else {
      return await response.json();
    }

  } catch (error) {
    console.log('Reclamaciones error ', error);
    return error;
  }
}

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



///raise money wasach, story telling, what are I working on, silicon slopes, byu management societies, start up midups.