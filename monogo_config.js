import mongoose from "mongoose";

const connection = x => mongoose.connect(x).then(() => {
    console.log('data base is connected');
})

export default connection;