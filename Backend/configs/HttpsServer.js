import https from "https";
import fs from "fs";
import path from "path";

const privateKey = fs.readFileSync(
  path.join("", "certs/localhost-key.pem"),
  "utf8"
);
const certificate = fs.readFileSync(
  path.join("", "certs/localhost.pem"),
  "utf8"
);
const credentials = { key: privateKey, cert: certificate };

const startHTTPSServer = (app, port, database) => {
  const httpsServer = https.createServer(credentials, app);
  database()
    .then(() => {
      httpsServer.listen(port, async () => {
        console.log("Server is running on https://localhost:" + port);
      });
    })
    .catch(() => {
      console.error(
        "Failed to start server due to DB connection error:",
        error
      );
      process.exit(1);
    });
};

export default startHTTPSServer;
