var {SHA256} =require('crypto-js');
var jwt = require('jsonwebtoken');

var bcrypt=require('bcryptjs');

var password="qwerty";
var salt=null;

bcrypt.genSalt(10,function (err,salt) {
    bcrypt.hash(password,salt,function (err,hash) {
        console.log(" :", "hash=", hash);
    })
})






/*const data = {
    id: "hello world"
}


var token = jwt.sign(data, "secret22");
console.log(" :", "token=", token);

var decoded = jwt.verify(token, "secret22");
console.log(" :", "decoded=", decoded);*/


/*
 const message = "qwerty12";
 const hash = SHA256(message).toString();


 var data = {
 id: 1,
 txt: "some text"
 }


 var token = {data, hash: SHA256(JSON.stringify(data)).toString()}
 console.log(" :", "token =", token.hash);


 var resultHash = SHA256(JSON.stringify(token.data)).toString();
 console.log(" :", "resultHash =", resultHash);

 if (resultHash === token.hash) {
 console.log("has iqual");
 }*/
