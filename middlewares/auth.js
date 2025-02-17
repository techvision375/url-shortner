const { getUser } = require("../service/auth");

function CheckForAuthentication(req, res,next){
    //this part for app how in this flow we authorize this
    // const authorizationHeaderValue = req.headers["authorization"];
    const tokenCookie = req.cookies?.token;
    // req.cookies?.token here the ? mark for null check


    req.user = null;
    //this part for app how in this flow we authorize this
    // if( !authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer ")){
    //     return next();
    // }
    // const token = authorizationHeaderValue.split("Bearer ")[1];
    if(!tokenCookie){
        return next();
    }
    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

function restrictTo(roles =[]){
    return function (req , res,next ){
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.user.role)) {
            return res.end("UnAuthorized");
        }

        next();
    };
}
module.exports = {
    CheckForAuthentication,
    restrictTo
}


// // code before authrization
// const { getUser } = require("../service/auth");

// async function restricTologgedIn(req, res, next) {
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers["authorization"];
//     if (!userUid) {
//         return res.redirect("/login");
//     }
//     const token = userUid.split("Bearer ")[1];
//     const user = getUser(token);
//     if (!user) {
//         return res.redirect("/login");

//     }
    
//     req.user = user;
//     next();
// }

// async function checkAuth(req, res ,next) {
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers["authorization"];
//     const token = userUid.split("Bearer ")[1];
//     const user = getUser(token);
   

   
//     req.user = user;
//     next();
// }

// module.exports = {
//     restricTologgedIn,
//     checkAuth,
// }