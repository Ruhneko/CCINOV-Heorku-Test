//======================================================================
// Imports
//======================================================================

const mongoose = require('mongoose');
const url = 'mongodb+srv://admin1:admin1@cluster0.nkw67.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//Uncomment when website is deployed.
/* 
const port = process.env.PORT;
if (port == null || port == "") {
    url = 'mongodb://localhost:27017/uchantestdb';
} */

//======================================================================
// Exports
//======================================================================

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

exports.connectToDb = () => {
    mongoose.connect(url, options, function(error) {
        if(error) throw error;
        console.log('Connected to: ' + url);
    });
};