import * as express from "express";
import { APP_PORT } from "./env";

const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("Hello World");
});

app.get("*", (req: express.Request, res: express.Response) => {
  res.status(500).json({ success: false, msg: "Internale Server Error" });
});

app.listen(APP_PORT, () => {
  console.log(`Server started at http://localhost:${APP_PORT}`);
});
