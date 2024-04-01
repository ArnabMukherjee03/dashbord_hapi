require("dotenv").config();
const server = require("./app");

(async ()=>{
    try {
        await server.start();
        console.log(`Server running at ${server.info.uri}`);
    } catch (error) {
        console.log("**Something Went Wrong***",error);
    }
})()
