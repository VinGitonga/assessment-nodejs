import * as express from "express";
import { APP_PORT } from "./env";
import { logger } from "./logger/winston";
import { morganMiddleware } from "./middlewares/morgan.middleware";
import { AppDataSource } from "./data-source";

const app = express();

app.use(express.json());
app.use(morganMiddleware);

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("Hello World");
});

app.get("*", (req: express.Request, res: express.Response) => {
  res.status(500).json({ success: false, msg: "Internal Server Error" });
});

AppDataSource.initialize()
  .then(() => {
    app.listen(APP_PORT, () => {
      logger.info(`Server started at http://localhost:${APP_PORT}`);
    });
    logger.info("App data source has been initialized successfully");
  })
  .catch((err) => logger.error("An error was encounted", err));
