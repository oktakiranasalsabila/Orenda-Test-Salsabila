import express, { Application } from "express";
import Server from "./src";

const app: Application = express();
const server: Server = new Server(app);
const PORT = process.env.PORT || 3000;

app
  .listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }  });
