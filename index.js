const express = require("express");
const path = require("path");

const urlroute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")
const userroute = require("./routes/user")

const { connectTOMongoDb } = require("./connect");
const URL = require("./models/url");
const cookieParser = require("cookie-parser");
const { CheckForAuthentication, restrictTo } = require("./middlewares/auth");

const app = express();
const PORT = 8000;
connectTOMongoDb("mongodb+srv://23cs3059:3FhIi7wKdlvlxvPc@cluster0.clpa5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(CheckForAuthentication);


app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlroute);
app.use("/user", userroute);
app.use("/", staticRoute);

app.use('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  }, {
    $push: {
      visitHistory: {
        timestamp: Date.now(),

      }
    }
  });
  res.redirect(entry.redirectURL);
})
app.listen(PORT, () => console.log(`Server started at port number ${PORT}`));
// some part with mongodb
// db.users.find({})
// db.users.updateMany({ {} , $set :{role : "NORMAL"}})
// db.users.updateOne({ {emai:"ram@gmail.com"} , $set :{role : "ADMIN"}})


// // before authorization
// const express = require("express");
// const path = require("path");


// const urlroute = require("./routes/url");
// const staticRoute = require("./routes/staticRouter")
// const userroute = require("./routes/user")

// const { connectTOMongoDb } = require("./connect");
// const URL = require("./models/url");
// const cookieParser = require("cookie-parser");
// const { restricTologgedIn, checkAuth } = require("./middlewares/auth");

// const app = express();
// const PORT = 8000;
// connectTOMongoDb("mongodb://127.0.0.1:27017/short");


// app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())

// app.use("/url", restricTologgedIn , urlroute);
// // ab restricTologgedIn jab tak login nahi hoge short url use nahi kar sakte ho
// app.use("/user", userroute);
// app.use("/", checkAuth, staticRoute);

// app.use('/url/:shortId', async (req, res) => {

//   const shortId = req.params.shortId;
//   const entry = await URL.findOneAndUpdate({
//     shortId
//   }, {
//     $push: {
//       visitHistory: {
//         timestamp: Date.now(),

//       }
//     }
//   });
//   res.redirect(entry.redirectURL);
// })
// app.listen(PORT, () => console.log(`Server started at port number ${PORT}`));











// complete before authentication

// const express = require("express");
// // ye path module inbuild hota hai server side rendering ke time use me late hai
// const path = require('path');
// const urlroute = require("./routes/url");
// const staticRoute = require("./routes/staticRouter")

// const { connectTOMongoDb } = require("./connect");
// const URL = require("./models/url");
// const app = express();
// const PORT = 8000;
// connectTOMongoDb("mongodb://127.0.0.1:27017/short");

// //yaha me express ko bata raha hu ki mujhe server side rendering karni hai
// // uske liye me ejs , view engin use kar raha hu
// app.set("view engine", "ejs");

// // yaha me express ko bata raha hu ki meri sari ejs file particularyly views folder me padi hai.
// app.set("views", path.resolve("./views"));

// //middlware
// app.use(express.json())
// // When a client sends data in JSON format (e.g., from a frontend or an API call), Express doesn't automatically parse it.
// // express.json() ensures that Express can read and process the JSON data.


// // now my app will support form data also
// app.use(express.urlencoded({ extended: false }))

// app.use("/url", urlroute);
// app.use("/", staticRoute);

// app.use('/url/:shortId', async (req, res) => {
//   // jo bhi ./:shortId esme aayega vo req.params.shortId me save ho jata hai,
//   const shortId = req.params.shortId;
//   const entry = await URL.findOneAndUpdate({
//     shortId
//   }, {
//     $push: {
//       visitHistory: {
//         timestamp: Date.now(),

//       }
//     }
//   });
//   res.redirect(entry.redirectURL);
// })
// app.listen(PORT, () => console.log(`Server started at port number ${PORT}`));

