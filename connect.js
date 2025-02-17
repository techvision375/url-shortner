const mongoose = require('mongoose');
async function connectTOMongoDb(url) {
    return mongoose.connect(url).then(() => console.log("MongoDB connected"))
        .catch((err) => console.log("Mongo Error", err));

}
module.exports = {
    connectTOMongoDb,
}


// we install 
// npm i cookie-parser

// to delete all generated url we should clear our database so
// command
// db.urls.deleteMany({})