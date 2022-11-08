// mongoose connection to database
// allows us to use the packages in this file

const mongoose = require('mongoose');
const config = require('config');
;
const db = config.get('mongoURI')

const connectDb = async () =>{

    try{
        await mongoose.connect(db);
        console.log('mongoDb Connected .......');

    } catch(err){
        console.error(err.message);
     
        process.exit(1);

    }

};

module.exports = connectDb