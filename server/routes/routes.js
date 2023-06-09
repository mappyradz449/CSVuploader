import express from 'express';
import csvtojson from 'csvtojson';
import multer from 'multer';
import dataSchema from '../models/data.js';
import { uploadCSV } from '../controllers/csvController.js';
import upload from '../utils/upload.js';

// const storage = multer.diskStorage({
//     destination:(req,file,cb) => {
//         cb(null,'./public/uploads/');
//     },
//     filename:(req,file,cb)=>{
//         cb(null, file.originalname);
//     },
// });
 
// const upload = multer({
//     storage,
// })

const router = express.Router();  

router.post('/upload', upload.single('file'), uploadCSV); 

// router.route('/upload').post(upload.single("csv"), async (req,res) => {
//     const jsonArray = await csv().fromFile(req.file.path);
//     //insert csv data to mongodb
//     dataSchema.insertMany(jsonArray, (error,res) => {
//         if(error){
//             return res.status(500).json({error})
//         }
//         return console.log("Added Successfully");
//     });
//     // res.json(jsonArray);
//     // const results=[];
//     // //Read csv file
//     // fs.createReadStream(file.path)
//     // .pipe(csv())
//     // .on('data', (data) => {
//     //   results.push(data);
//     // })
//     // .on('end', () => {
//     //   // Process the data and store it in the database
//     //   processData(results)
//     //     .then((report) => {
//     //       res.json(report);
//     //     })
//     //     .catch((error) => {
//     //       res.status(500).json({ error: 'Internal server error' });
//     //     });
//     // });
// });

export default router;





