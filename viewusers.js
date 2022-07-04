const db = require('./model/database.js');
const User = require('./model/user.js');

db.connectToDb();
User.find({}, (err, result) => {
    console.log(result);
})