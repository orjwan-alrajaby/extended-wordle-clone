import express, { Express, Request, Response, NextFunction } from "express";
import sequelizeInstance from "./db/config";
import { PORT } from "./constants/env";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import gameRoutes from "./routes/game";
import checkIfAuthenticated from "./middlewares/checkIfAuthenticated";
import checkIfAdmin from "./middlewares/checkIfAdmin";
import LevelModel from "./models/Level.model";
import ThemeModel from "./models/Theme.model";
import UserProgressionModel from "./models/UserProgression.model";
import { Op, literal } from "sequelize";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/protected", checkIfAuthenticated, (req: Request, res: Response) => {
  res.send("This is a Protected Route | Express + TypeScript Server");
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/game", checkIfAuthenticated, gameRoutes);

const getStuff = async () => {
  const theme = await ThemeModel.findByPk(
    "038f7219-2b41-40cf-b6e1-4ce5b5ac003d"
  );

  const userProgressionsWithThemes = await UserProgressionModel.findAll({
    attributes: ["themeId"], // Select only the themeId column
    include: [
      {
        model: ThemeModel, // Include the ThemeModel
        attributes: [], // Select only the id and name columns
      },
    ],
    group: ["themeId"], // Group by themeId to ensure distinct themes
  });

  // console.log(JSON.stringify(theme, null, 2));
  console.log(JSON.stringify(userProgressionsWithThemes[0], null, 2));
};

getStuff();

app.listen(PORT, async () => {
  console.info(`[server]: Server is running at http://localhost:${PORT}`);
  try {
    await sequelizeInstance.authenticate();
    console.info("Connection has been established successfully.");
    // sequelizeInstance.sync({ force: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
