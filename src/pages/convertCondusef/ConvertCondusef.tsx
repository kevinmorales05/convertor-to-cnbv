
import React, { useState } from "react";
import "./Convertidor.css";
import Button from "../../components/Button/Button.tsx";
import { FaDownload } from "react-icons/fa";
import Papa from "papaparse";

import { CsvData } from "../../types/types.ts";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { capitalizeFirstLetter, convertDateToYYYYMMDD } from "../../utils/utils.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import convertoCondusefJson from "../../features/convertToCondusef.ts";


export default function ConvertCondusef() {
  const context: any = useContext(Context);
  let username = capitalizeFirstLetter(context.username);
  const [fileToUpload, setFileToUpload] = useState("");
  //data uploaded
  const [data, setData] = useState<CsvData[]>([]);
  const [dataConverted, setDataConverted] = useState<CsvData[]>([]);

  const [uploadedFile, setUploadedFile] = useState(false);
  const [fileConvertedName, setFileConvertedName] = useState("");
  const [dateEnd, setDateEnd] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("archivo", file);
    console.log("archivo nombre", file.name);
    setFileToUpload(file.name);
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          //console.log("results ", results);
          setData(results.data as CsvData[]);
        },
      });
      setUploadedFile(true);
    }
  };

  
  function convertFileToCondusefJson(tipo:string) {
    let file = convertoCondusefJson(data, convertDateToYYYYMMDD(date), convertDateToYYYYMMDD(dateEnd), tipo);
    console.log("JSON", file);

    // Crear un blob a partir del CSV
    const jsonString = JSON.stringify(file, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });

    // Crear un enlace para la descarga
    const url = URL.createObjectURL(blob);
    // Crear un enlace y simular un clic para descargar el archivo
    const link = document.createElement("a");
    link.href = url;
    console.log("json link", link);
    link.setAttribute("download", "r27File.json");
    document.body.appendChild(link);
    link.click(); 
   }

  function downloadFile() {
    console.log("data to download ", data);
    console.log(typeof dataConverted);
    //descargar archivo
    const csv = Papa.unparse(data);

    // Crear un blob a partir del CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Crear un enlace para la descarga
    const url = URL.createObjectURL(blob);

    // Crear un enlace y simular un clic para descargar el archivo
    const link = document.createElement("a");
    link.href = url;
    console.log("el link", link);
    link.setAttribute("download", "tickets.csv");
    document.body.appendChild(link);
    link.click();

    console.log("descargando archivo");
  }


  return (
    <div className="App convertidor-main">
      <div className="convertidor-block">
        <h1 className="convertidor-title">Convertidor CONDUSEF</h1>
        
      </div>
      <p className="user-name"> {username}</p>
      <div>
        <input
          className="convertidor-uploadFile"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          name="Subir un archivo"
        />
      </div>
      {data.length !== 0 ? (
        <>
          <div className="convertidor-btns">
           
            <Button
              onClick={() => convertFileToCondusefJson("consultas")}
              text={"Descargar JSON CONSULTAS"}
            />
           
          </div>
          <div className="convertidor-btns">
           
            <Button
              onClick={() => convertFileToCondusefJson("reclamaciones")}
              text={"Descargar JSON RECLAMACIONES"}
            />
           
          </div>
          <div className="convertidor-btns">
           
           <Button
             onClick={() => convertFileToCondusefJson("aclaraciones")}
             text={"Descargar JSON ACLARACIONES"}
           />
          
         </div>
        </>
      ) : (
        <></>
      )}

      {uploadedFile === true ? (
        <>
        <div className="date-section">
          <p>Si no se escoge las fechas de inicio o fin, el archivo se imprime con las fechas del día de hoy.</p>
          <label htmlFor="initDate">Fecha de inicio de reporte</label>
          <DatePicker name="initDate" selected={date} onChange={(date) => setDate(date)} />
          <label htmlFor="endDate">Fecha de final de reporte</label>
          <DatePicker name="endDate" selected={dateEnd} onChange={(date) => setDateEnd(date)} />

        </div>
          <div>
            <h2>Archivo Cargado</h2>
            <p>{fileToUpload}</p>
          </div>
        </>
      ) : (
        <></>
      )}
      {dataConverted.length !== 0 ? (
        <>
          <div>
            <h2>Archivo Convertido</h2>
            <p>{fileConvertedName}</p>
            <button onClick={downloadFile}>
              <FaDownload />
            </button>
          </div>
        </>
      ) : (
        <></>
      )}

      <div>
        {fileToUpload !== "" ? (
          <>
            <div>
              <h2>Visualización de archivo Cargado</h2>
              <div className="horizontal-scroll-container">
                {data.length > 0 && (
                  <table className="convertidor-table">
                    <thead className="convertidor-head">
                      <tr>
                        {Object.keys(data[0]).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, index) => (
                        <tr key={index}>
                          {Object.values(row).map((value, idx) => (
                            <td key={idx}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        ) : (
          <>Visualización no disponible</>
        )}
      </div>
    </div>
  );
}
