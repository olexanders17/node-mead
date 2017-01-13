var env = process.env.NODE_ENV || "development";
if (env === "development") {
    process.env.PORT = 3000;
    process.env.MONGO_URI = "mongodb://heroku_6r1zxd7q:vmcgh192kv5qb8qg71hc37s9cp@ds163718.mlab.com:63718/heroku_6r1zxd7q" ;
} else if (env === "test") {
    process.env.PORT = 3000;
    process.env.MONGO_URI = "mongodb://localhost:27017/TodoAppTest"
}
