import mongoose from "mongoose";

// Create a schema for the CSV data
const fileSchema = new mongoose.Schema({

    // path: {
    //   type: String,
    //   required: true
    // },
    // downloadContent: {
    //   type: Number,
    //   required: true,
    //   default: 0
    // },

    name: {
      type : String,
      required : true,
    },
    email: {
      type: String,
      unique: true,
      rrequired : true,
    },

    phoneNumber: {
      type: String,
      unique: true,
      required : true,
    },
    gender: {
      type : String,
      required : true,
    },
    address: {
      type : String,
      required : true,
    }
  });


// Create a model based on the schema
const File = mongoose.model('File', fileSchema)

export default File;