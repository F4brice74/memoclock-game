import express from "express";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import { json } from "body-parser";
import { resultRouter } from "./routes/results.route";

// initilisation du dotenv pour prise en compte des variables du .env
dotenv.config();

//uitlisation du framework express pour le backend
const app = express();

// utilisation du middleware cors pour la gestion CORS entre domaines
app.use(cors());
app.use(json());

// utilisation du router contenant nos routes
app.use(resultRouter);

// try catch de connexion à la base de données
try {
  mongoose.connect(
    process.env.DB_CONFIG || "",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions,
    () => {
      console.log("connected to database");
    }
  );
} catch (error) {
  console.log(error);
}

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
