var env = process.env.NODE_ENV || "development";


if (env === "development" || env === "test") {
    var config = require("./config.json");
    console.log(" :", "config=", config);
    var envConfig = config[env];


    Object.keys(envConfig).forEach(function (key) {
        process.env[key] = envConfig[key];
    })
}


/*if (env === "development") {
 // process.env.PORT = 3000;
 process.env.MONGO_URI = "mongodb://localhost:27017/TodoApp" ;
 } else if (env === "test") {
 // process.env.PORT = 3000;
 process.env.MONGO_URI = "mongodb://localhost:27017/TodoAppTest"
 }
 if (env === "production") {
 // process.env.PORT = 3000;
 process.env.MONGO_URI = "mongodb://heroku_6r1zxd7q:vmcgh192kv5qb8qg71hc37s9cp@ds163718.mlab.com:63718/heroku_6r1zxd7q" ;
 }*/
