const jwt = require("jsonwebtoken");
const secret = "tarunkumar@$1234";
function setUser(user) {

    return jwt.sign({
        _id: user._id,

        email: user.email,
        role : user.role,
    }, secret);
}


function getUser(token) {
    if (!token) return null;
    //this is must to do if condition here 
    //other wise error for jwt must be provide
    // by using try and catch mera server crash nahi kar raha hai
    try {

        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}


module.exports = {
    setUser,
    getUser,
};


// // lecture: before jwt authentication
// const sessionIdToUserMap = new Map();
// //hashmap
// //here we maintian our state

// function setUser(id, user) {

//     sessionIdToUserMap.set(id, user);
// }


// function getUser(id) {

//     return sessionIdToUserMap.get(id);
// }


// module.exports ={
//     setUser,
//     getUser,
// };