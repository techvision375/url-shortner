
const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../service/auth");
const { set } = require("mongoose");


async function HandleUserSingUp(req, res) {
    const {name ,email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");

}

async function HandleUserLogin(req, res) {
    const { email, password} = req.body;

    const user = await User.findOne({ email , password});

    // console.log("user" ,user)
    if(!user){
       return  res.render("login", {
            error:"invalid username or passowrd",
        });
    }
    const token = setUser(user)
    
    res.cookie("token" , token)
    return res.redirect("/");

    // here we do for app not for web 
    // return res.json({token});

}
module.exports = {
    HandleUserSingUp,
    HandleUserLogin,

}


// // before authorization
// const User = require("../models/user");
// const { v4: uuidv4 } = require('uuid');
// const { setUser } = require("../service/auth");
// const { set } = require("mongoose");


// async function HandleUserSingUp(req, res) {
//     const {name ,email, password} = req.body;
//     await User.create({
//         name,
//         email,
//         password,
//     });
//     return res.redirect("/");

// }

// async function HandleUserLogin(req, res) {
//     const { email, password} = req.body;

//     const user = await User.findOne({ email , password});

//     // console.log("user" ,user)
//     if(!user){
//        return  res.render("login", {
//             error:"invalid username or passowrd",
//         });
//     }
//     const token = setUser(user)
    
//     // res.cookie("uid" , token)
//     // return res.redirect("/");

//     // here we do for app not for web 

//     return res.json({token});

// }
// module.exports = {
//     HandleUserSingUp,
//     HandleUserLogin,

// }



// // code before jwt authentication
// const User = require("../models/user");
// const { v4: uuidv4 } = require('uuid');
// const { setUser } = require("../service/auth");
// const { set } = require("mongoose");


// async function HandleUserSingUp(req, res) {
//     const {name ,email, password} = req.body;
//     await User.create({
//         name,
//         email,
//         password,
//     });
//     return res.redirect("/");

// }

// async function HandleUserLogin(req, res) {
//     const { email, password} = req.body;

//     const user = await User.findOne({ email , password});

//     // console.log("user" ,user)
//     if(!user){
//        return  res.render("login", {
//             error:"invalid username or passowrd",
//         });
//     }
//     const sessionId = uuidv4();
//     setUser(sessionId , user);
//     res.cookie("uid" ,sessionId)
//     return res.redirect("/");

// }
// module.exports = {
//     HandleUserSingUp,
//     HandleUserLogin,

// }


