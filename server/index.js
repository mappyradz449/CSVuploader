import express from 'express';
import router from './routes/routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';

import Connection from './database/db.js';

const app = express();
const port = 8000;

app.use(cors());



Connection();


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use('/', router);
// app.use("/api/uploadCsv", Routes);
// app.use("/public", express.static(path.join(__dirname, "public")));

// const upload = multer({ dest: 'uploads/' });

// app.post("/upload",upload.single('file'),(req,res) => {
//     const file = req.file;

//     if (!file) {
//         return res.status(400).send('No file uploaded');
//       }
    
//       const results = [];

// // Read the uploaded CSV file
//   fs.createReadStream(file.path)
//   .pipe(csv())
//   .on('data', (data) => {
//     results.push(data);
//   })
//   .on('end', () => {
//     // Process the data and store it in the database
//     processData(results)
//       .then((report) => {
//         res.json(report);
//       })
//       .catch((error) => {
//         res.status(500).json({ error: 'Internal server error' });
//       });
//   });
// });

// // Process the data and return a summary report
// async function processData(data) {
//     let totalData = 0;
//     let totalUploaded = 0;
//     let totalDuplicate = 0;
//     let totalInvalid = 0;
//     let totalIncomplete = 0;
  
//     for (const entry of data) {
//       totalData++;
  
//       // Check if all fields are available
//       if (
//         !entry.name ||
//         !entry.email ||
//         !entry.phoneNumber ||
//         !entry.gender ||
//         !entry.address
//       ) {
//         totalIncomplete++;
//         continue;
//       }
  
//       // Check for duplicate phone number or email
//       const existingEntry = await Data.findOne({
//         $or: [{ email: entry.email }, { phoneNumber: entry.phoneNumber }],
//       });
  
//       if (existingEntry) {
//         totalDuplicate++;
//         continue;
//       }
  
//       // Validate Bangladeshi phone number
//       const phoneRegex = /^01[0-9]{9}$/;
//       if (!phoneRegex.test(entry.phoneNumber)) {
//         totalInvalid++;
//         continue;
//       }
  
//       // Create a new data object and save it to the database
//       const newData = new Data({
//         name: entry.name,
//         email: entry.email,
//         phoneNumber: entry.phoneNumber,
//         gender: entry.gender,
//         address: entry.address,
//       });
  
//       await newData.save();
//       totalUploaded++;
//     }
  
//     const report = {
//       totalData,
//       totalUploaded,
//       totalDuplicate,
//       totalInvalid,
//       totalIncomplete,
//     };
  
//     return report;
// }


//start the server
app.listen(port, () => console.log(`Server running on PORT ${port}`));
