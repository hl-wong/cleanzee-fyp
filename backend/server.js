require("dotenv").config();
const http = require("http");

const app = require("./app");
const server = http.createServer(app);

const setupSocket = require("./socket");
setupSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
