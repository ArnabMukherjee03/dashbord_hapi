const Hapi = require("@hapi/hapi");
const authRouter = require("./routes/auth.route");
const boardRouter = require("./routes/board.route");
const port = parseInt(process.env.PORT) || 8080;

const server = Hapi.server({
  port: port,
  host: "localhost",
  routes: {
    cors: {
      origin: ["http://localhost:5173"],
      headers: ["Accept", "Content-Type", "Authorization"],
      additionalHeaders: ["X-Requested-With"],
    },
  },
});



[...authRouter,...boardRouter].forEach((path) => server.route(path))


module.exports = server;


// npx sequelize-cli model:generate --name user --attributes  name:string,email:string,password:string
// npx sequelize-cli model:generate --name Board --attributes name:string,description:string,image:string,owner:string