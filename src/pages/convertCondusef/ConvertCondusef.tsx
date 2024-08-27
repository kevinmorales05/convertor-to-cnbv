
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
import { sendAclaraciones, sendConsultasCondusef, sendReclamaciones } from "../../services/condusef/condusef.ts";
import { useNavigate } from "react-router-dom";
import ReactJson from 'react-json-view';

export default function ConvertCondusef() {
  const navigate = useNavigate();
  const context: any = useContext(Context);
  let username = capitalizeFirstLetter(context.username);
  const [fileToUpload, setFileToUpload] = useState("");
  //data uploaded
  const [data, setData] = useState<CsvData[]>([]);
  const [dataConverted, setDataConverted] = useState<CsvData[]>([]);

  const [uploadedFile, setUploadedFile] = useState(false);
  const [fileConvertedName, setFileConvertedName] = useState("");
  const [typeForm, setTypeForm] = useState("1");
 
  const [trimestre, setTrimestre] = useState("1");
  const [downloadedJson, setDownloadedJson] = useState(false);
  const [jsonCondusef, setJsonCondusef] = useState<any>(null);
  const [errorsList, setErrorsList] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDownloadedJson(false);
    setErrorsList(null);
    const file = event.target.files?.[0];
    // console.log("archivo", file);
    // console.log("archivo nombre", file.name);
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

  const handleSelectChange = (event) => {
    setTrimestre(event.target.value); // Update the state with the selected value
  };

  function convertFileToCondusefJson(tipo:string) {
    let file = convertoCondusefJson(data, trimestre, tipo);
    console.log("JSON", file);
    console.log('setting the json in the app');
    setJsonCondusef(file);
    // Crear un blob a partir del CSV
    const jsonString = JSON.stringify(file, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });

    // Crear un enlace para la descarga
    const url = URL.createObjectURL(blob);
    // Crear un enlace y simular un clic para descargar el archivo
    const link = document.createElement("a");
    link.href = url;
    console.log("json link", link);
    let nameTipo: string = "";
    if(tipo === "1"){
      nameTipo = "consultas";
    }
    else if(tipo === "2") {
      nameTipo = "reclamaciones";
    }
    else if(tipo === "3") {
      nameTipo = "aclaraciones";
    }
   
    link.setAttribute("download", `condusef-${nameTipo}.json`);
    document.body.appendChild(link);
    link.click(); 
    setDownloadedJson(true);
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

  async function sendFileToCondusef(){
    console.log('Sending file to Condusef');
    console.log('selected function ', typeForm);
    if(typeForm === '1'){
      let response = await sendConsultasCondusef(jsonCondusef, context.token);
      console.log("response consultas", response);
     
      if(response.msg) {
        alert(`${response.msg}`);
        //aqui navegar al login
        navigate("/login");
      }
      else {
       console.log(response.errors);
       setErrorsList(response.errors);
        alert(`${response.message} `);
      }
    }
    if(typeForm === '2'){
      let response = await sendAclaraciones(jsonCondusef, context.token);
      console.log("response aclaraciones", response);
      if(response.msg) {
        alert(`${response.msg}`);
        //aqui navegar al login
        navigate("/login");
      }
      else {
       console.log(response.errors);
       setErrorsList(response.errors);
        alert(`${response.message} `);
      }
    }
    if(typeForm === '3'){
      let response = await sendReclamaciones(jsonCondusef, context.token);
      if(response.msg) {
        alert(`${response.msg}`);
        //aqui navegar al login
        navigate("/login");
      }
      else {
       console.log(response.errors);
       setErrorsList(response.errors);
        alert(`${response.message} `);
      }
    }




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
        {
          downloadedJson === false ? <>
          <div className="convertidor-btns">
          <p>Escoger el trimestre</p>
            <select value={trimestre} onChange={handleSelectChange}>
              <option value="">Trimestre</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
           
            <Button
              onClick={() => {convertFileToCondusefJson("1")
                setTypeForm("1");
              }}
              text={"Descargar JSON CONSULTAS"}
            />
           
          </div>
          <div className="convertidor-btns">
           
            <Button
              onClick={() => {convertFileToCondusefJson("2")
                setTypeForm("2");
              }}
              text={"Descargar JSON RECLAMACIONES"}
            />
           
          </div>
          <div className="convertidor-btns">
           
           <Button
             onClick={() => {convertFileToCondusefJson("3")
              setTypeForm("3");
            }}
             text={"Descargar JSON ACLARACIONES"}
           />
          
         </div>
          </> : <>
          <Button
             onClick={() => {
              sendFileToCondusef();
            }}
             text={"Enviar información a CONDUSEF"}
           />
           {
            errorsList === null ? <></>: <>
           {/* <pre>{JSON.stringify(errorsList, null, 2)}</pre>  */}
            <div className="jsonViewer">
              <h2>Errores</h2>
              <ReactJson src={errorsList} />
            </div>
            
            </>
           }
          </>
        }
          
        </>

      ) : (
        <></>
      )}

      {uploadedFile === true ? (
        <>
        
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
