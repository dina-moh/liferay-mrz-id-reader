import React from 'react';
import {useLocation} from 'react-router-dom';
import QRCode from 'qrcode.react';


const colorText = {
    color: 'var(--secondary)',
    fontWeight: "bold",
};


export default function QrCodePage({idNumber,name,cusType,currentDate}) {
//function getDate() {
//
//}

    return (
        <div className="card" style={{borderRadius: "15px"}}>
            <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">Thank you for your submission</h2>
                {idNumber && name && (
                    <div>
                        <p><span style={colorText}>ID Number:</span> {idNumber}</p>
                        <p><span style={colorText}>Submission Date:</span> {currentDate}</p>
                        <p><span style={colorText}>Full Name:</span> {name}</p>
                        <p><span style={colorText}>Customer Type:</span> {cusType}</p>
                        <QRCode value={`${idNumber} ${name} ${cusType}`} size={200}/>
                    </div>
                )}
            </div>
        </div>
    );
}
