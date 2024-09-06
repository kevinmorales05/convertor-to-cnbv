import { ReporteAnonimo } from "../../types/types";

let mindsURL = "https://prodycondusef.onrender.com/api/insertReporteAnonimo";

export async function sendReport(reporte: ReporteAnonimo) {
  try {
    const response = await fetch(mindsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reporte),
    });
    console.log('this is the minds response ', response);
    if (response.ok) return await response.json();

  } catch (error) {
    console.log("MINDS error ", error);
    return error;
  }
}
