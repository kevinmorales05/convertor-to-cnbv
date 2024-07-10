import React, { useState } from "react";
import "./Convertidor.css";
import Button from "../../components/Button/Button.tsx";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import Papa from "papaparse";
import convertoCnbv from "../../features/convertToCnbv.ts";

import { CsvData } from "../../types/types.ts";

export default function Convertidor() {
  const [fileToUpload, setFileToUpload] = useState("");
  //data uploaded
  const [data, setData] = useState<CsvData[]>([]);
  const [dataConverted, setDataConverted] = useState<CsvData[]>([]);

  const [uploadedFile, setUploadedFile] = useState(false);

  function uploadFile() {
    console.log("upload file");
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("archivo", file);
    console.log("archivo", file.name);
    setFileToUpload(file.name);
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log("results ", results);
          setData(results.data as CsvData[]);
        },
      });
      setUploadedFile(true);
    }
  };

  function convertFileToCNBV() {
    console.log("to CNBV");
    setUploadedFile(false);
  }
  function convertFileToCondusef() {
    console.log("to Condusef");
    setUploadedFile(false);
  }
  function downloadFile() {
    console.log("descargando archivo");
  }

  return (
    <div className="convertidor-main">
      <div className="convertidor-block">
        <h1 className="convertidor-title">Convertidor</h1>
      </div>
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
              onClick={() => convertoCnbv(data)}
              text={"Convertir a CNBV R7"}
            />
            <Button
              onClick={() => convertoCnbv(data)}
              text={"Convertir a CONDUSEF Mensual"}
            />

            <Button onClick={uploadFile} text={"Convertir a CONDUSEF Trimestral"} />
          </div>
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
            <p>{fileToUpload}</p>
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
