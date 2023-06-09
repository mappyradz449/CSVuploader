// const importUser = async(req,res) => {
//     try{
//         res.send({status:200, success:true, msg:'running'});
//     }catch(error){
//         res.send({status:400, success:false, msg:error.message});
//     }
// }

// export default importUser;

import File from "../models/data.js";
import fs from 'fs';
import csvtojson from 'csvtojson';

export const uploadCSV = async (req,res) => {
     //return res.status(200).json({msg: 'Hello'})
    //console.log(req);
    const fileObj = {
        path: req.file.path,
        name: req.file.originalname,
    }
    
     try{
        var dataResp = [];
       //File.create(fileObj); //will validate the file and save in db
       csvtojson()
            .fromFile(req.file.path)
            .then(async (csvData) => {
                console.log(csvData);

                let totalData = 0;
                let totalUploaded = 0;
                let totalDuplicate = 0;
                let totalInvalid = 0;
                let totalIncomplete = 0;

                //const results = { totalData: 0, uploaded: 0, duplicate: 0, invalid: 0, incomplete: 0 };

                for(var x=0; x < csvData.length; x++){
                    totalData++;

                    dataResp.push({
                        name: csvData[x].Name,
                        email: csvData[x].Email,
                        phoneNumber: csvData[x].Phone,
                        gender: csvData[x].Gender,
                        address: csvData[x].Address,
                    });

                    // Check if all fields are available
                    if (!csvData[x].Name || !csvData[x].Email || !csvData[x].Phone || !csvData[x].Gender || !csvData[x].Address) 
                    {
                            totalIncomplete++;
                            continue;
                     }


                    // Check for duplicate phone number or email
                    const existingEntry = await File.findOne({
                         $or: [{ email: csvData[x].Email }, { phoneNumber: csvData[x].Phone }],
                     });
  
                    if (existingEntry) {
                            totalDuplicate++;
                            continue;
                    } 

                    // Validate Bangladeshi phone number
                    const phoneRegex = /^01[0-9]{9}$/;
                    if (!phoneRegex.test(csvData[x].Phone)) {
                        totalInvalid++;
                        continue;
                    }

                    // Create a new data object and save it to the database
                    const newData = new Data({
                        name: csvData[x].Name,
                        email: csvData[x].Emai,
                        phoneNumber: csvData[x].Phone,
                        gender: csvData[x].Gender,
                        address: csvData[x].Address,
                    });
  
                    await newData.save();
                    totalUploaded++;

                }

                await File.insertMany(dataResp);
                console.log(totalDuplicate);
                console.log(totalData);
                console.log(totalUploaded);
                res.send({
                    totalData,
                    totalUploaded,
                    totalDuplicate,
                    totalInvalid,
                    totalIncomplete,
                  });    
                
               
            });
    }catch(error){
        console.error(error.message);
    }
}

