//we cant directly connect expresss to mongodb.we do it by mongoose
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = () => {
    const MONGODB_URI=`mongodb://${USERNAME}:${PASSWORD}@ac-8iji8sc-shard-00-00.bpyzf5a.mongodb.net:27017,ac-8iji8sc-shard-00-01.bpyzf5a.mongodb.net:27017,ac-8iji8sc-shard-00-02.bpyzf5a.mongodb.net:27017/?ssl=true&replicaSet=atlas-4gskkb-shard-0&authSource=admin&retryWrites=true&w=majority`;


    mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

    mongoose.connection.on('connected', () => {
        console.log(`Database connected successfully`);
    })
    mongoose.connection.on('disconnected', () => {
        console.log(`Database disconnected`);
    })
    mongoose.connection.on(`error`, () => {
        console.log(`Error while connecting to the database`, error.message);
    })

}

export default Connection;