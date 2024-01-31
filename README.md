# liferay-mrz-id-reader

Overview
Liferay MRZ ID Reader is a React application designed to read Machine Readable Zone (MRZ) information from identity documents. This app utilizes OCR (Optical Character Recognition) technology to extract relevant data from passports, IDs, and other similar documents.

## FEATURES

**MRZ Extraction:** Utilizes OCR to extract information from the MRZ of identity documents.
**User-friendly Interface:** A clean and intuitive user interface for easy interaction.
**Cross-browser Compatibility:** Compatible with major web browsers.

## INSTALLATION
To run the Liferay MRZ ID Reader locally, follow these steps:

Clone the repository:
```
git clone https://github.com/dina-moh/liferay-mrz-id-reader.git
```

Change into the project directory:
```
cd liferay-mrz-id-reader
```

Install dependencies:
```
npm install
```

Usage
After completing the installation, you can start the development server using the following command:
```
npm start
```
Visit http://localhost:3000 in your web browser to access the application.

## API Configuration
In the `src/serviceRequest.js` file, you'll find the `postRequest` function responsible for making API calls. It's essential to adjust the API endpoint and request parameters based on your backend setup.
 
## Important Note
When calling the `postRequest` function in the `idReader.js` file, ensure that the field names in the `requestData` object match the expected format on the Liferay backend. The structure of this object should align with the expected payload on the server side.

