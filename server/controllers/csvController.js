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

                for(var x=0; x < csvData.length; x++){
                    dataResp.push({
                        name: csvData[x].Name,
                        email: csvData[x].Email,
                        phoneNumber: csvData[x].Phone,
                        gender: csvData[x].Gender,
                        address: csvData[x].Address,
                    });
                }

                await File.insertMany(dataResp);
                // File.insertMany(csvData).then(function () {
                //     console.log("Data inserted")
                //     res.json({success: 'success'});
                // }).catch(function (error){
                //     console.log(error)
                // });
            });
    }catch(error){
        console.error(error.message);
    }

}