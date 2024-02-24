import express, { Express, Request, Response } from "express";
import sequelizeInstance from "./db/config";
import { PORT } from "./constants/env"
import User from "./models/User.model";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  User.create({ username: "Jane32", email: "Doe@janie32.com" }).then((user: any) => {
    res.send("Express + TypeScript Server | " + JSON.stringify(user));
   })
});

app.listen(PORT, async () => {
  console.info(`[server]: Server is running at http://localhost:${PORT}`);
  try {
  await sequelizeInstance.authenticate();
  console.info('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
});