import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import Dropzone from "react-dropzone";
import QRCode from "qrcode.react";
import QrCodePage from "./QrCodePage";
import { postRequest } from "./services/serviceRequest"; 

const dropzoneStyle = {
  border: `2px dashed var(--primary)`,
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const imageStyle = {
  marginTop: "20px",
  maxWidth: "100%",
};

const btnColor = {
  backgroundColor: `var(--secondary)`,
  color: `var(--light)`,
};




export default function IdReader() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading,setIsLoading]  = useState(false);
  const [idNumber, setIdNumber] = useState(null);
  const [name, setName] = useState("");
  const [cusType, setCusType] = useState("1");
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString());


  const [showQRCode,setShowQRCode] = useState(false);

  function handleImageUpload(acceptedFiles) {
    setIsLoading(true);
    const imageFile = acceptedFiles[0];
    setUploadedImage(URL.createObjectURL(imageFile));

    Tesseract.recognize(imageFile, "eng", {
      logger: (info) => console.log(info),
    }).then(({ data: { text } }) => {
      const lines = text.split("\n");

      // Extract ID number from the fourth-to-last line
      const idLine = lines[lines.length - 4];
      const idNumberMatch = idLine.match(/\d+/); // Match all consecutive numbers
      if (idNumberMatch) {
        const extractedIdNumber = idNumberMatch[0];
        setIdNumber((extractedIdNumber));
      }

      // Extract full name from the last line and replace "<" with " "
      const lastLine = lines[lines.length - 2];
      const cleanedFullName = lastLine.replace(/<+/g, " ").trim();

      console.log("Cleaned Name" + cleanedFullName);
      setName(cleanedFullName);
      setIsLoading(false);
    });
  }

  function handleCusTypeChange(e) {
    setCusType(e.target.value);
  }

  function handleCreateNewObject() {
    let newDemoRequestData = {
      "civilID": idNumber,
      "customerType": cusType,
      "fullName": name
    }

    postRequest(newDemoRequestData);
    console.log("Reached here : " + newDemoRequestData)
  }

  function handleGenerateQRCode() {
    handleCreateNewObject();
    setShowQRCode(true);
  }

  return (
     <>
       {!showQRCode && (
           <div className="card" style={{ borderRadius: "15px" }}>
             <div className="card-body p-5">

               <h2 className="text-uppercase text-center mb-5">
                 Demo Service Request
               </h2>

               <form>

                 <div className="form-outline mb-4">

                   <Dropzone onDrop={handleImageUpload} accept="image/*">
                     {({ getRootProps, getInputProps }) => (
                         <div {...getRootProps()} style={dropzoneStyle}>
                           <input {...getInputProps()} />
                           <p>
                             Drag & drop an ID photo here, or click to select
                             one
                           </p>
                         </div>
                     )}
                   </Dropzone>

                 </div>

                 {uploadedImage && (
                     <div className="form-outline mb-4">

                       <img
                           src={uploadedImage}
                           alt="Uploaded ID"
                           style={imageStyle}
                       />

                     </div>
                 )}

                 <div className="form-outline mb-4">
                   {isLoading && (<div><strong>Reading ID Card...</strong></div>)}
                   {!isLoading && idNumber && (
                       <div>
                         <label className="form-label" htmlFor="">
                           Civil ID
                         </label>
                         <input
                             type="text"
                             className="form-control form-control-md"
                             value={idNumber}
                             placeholder="Civil ID captured form photo ID"
                             disabled
                         />
                         <div className="form-outline mb-4">

                           <label className="form-label" htmlFor="">
                             Full Name
                           </label>

                           <input
                               type="text"
                               className="form-control form-control-md"
                               value={name}
                               placeholder="Full Name captured form photo ID"
                               disabled
                           />

                         </div>
                         <div className="form-outline mb-4">

                           <label className="form-label" htmlFor="form3Example4cdg">
                             Customer Type
                           </label>

                           <select id="" className="form-control form-control-md" value={cusType}
                                   onChange={handleCusTypeChange}>
                             <option value="1">Type 1</option>
                             <option value="2">Type 2</option>
                             <option value="3">Type 3</option>
                             <option value="4">Type 4</option>
                             <option value="5">Type 5</option>

                           </select>

                         </div>
                         <div className="d-flex justify-content-center">

                           <button
                               type="button"
                               className="btn btn-block btn-lg gradient-custom-4 text-body"
                               style={btnColor}
                               onClick={handleGenerateQRCode}
                           >
                             Register
                           </button>

                         </div>
                       </div>
                   )}
                 </div>
               </form>
             </div>

           </div>
       )}
       {showQRCode && (
           <QrCodePage cusType={cusType} name={name} idNumber={idNumber} currentDate={currentDate}></QrCodePage>
       )}
     </>
  );
}



