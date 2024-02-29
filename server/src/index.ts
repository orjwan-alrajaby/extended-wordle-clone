import express, { Express, Request, Response, NextFunction } from "express";
import sequelizeInstance from "./db/config";
import { PORT } from "./constants/env"
import authRoutes from "./routes/auth";
import checkIfAuthenticated from "./middlewares/checkIfAuthenticated";

const app: Express = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/protected", checkIfAuthenticated, (req: Request, res: Response) => {
  res.send("This is a Protected Route | Express + TypeScript Server");
});

app.use('/auth', authRoutes);

app.listen(PORT, async () => {
  console.info(`[server]: Server is running at http://localhost:${PORT}`);
  try {
    await sequelizeInstance.authenticate();
    console.info('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});