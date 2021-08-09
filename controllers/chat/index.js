// const { isHttpError } = require('http-errors');
const { v4: uuidv4 } = require('uuid');
const clone = require('clone');

const users = [];

const login = (name, sid) => {
    const uid = uuidv4();
    const user = {
        id: uid, 
        sid,
        profile: { name }
    };
    users.push(user);
    return uid;
};

const getUserBySid = (sid) => {
   const user =  users.find(user => user.sid === sid);
   return clone(user)
};

module.exports = {
    login,
    getUserBySid,
}