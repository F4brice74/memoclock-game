import express, { Request, Response } from "express";
import { Result } from "../models/result.model";

// création d'un router
const router = express.Router();

// définition de la route en GET pour récupérer tous les éléments en base de données.
router.get("/api/result", async (req: Request, res: Response) => {
  const result = await Result.find({});
  return res.status(200).send(result);
});

// définition de la route en POST pour écrire le jeu de donnée en base de données
router.post("/api/result", async (req: Request, res: Response) => {
  const { score, time } = req.body;
  const date = new Date();
  const result = new Result({ score, time, date });
  await result.save();
  return res.status(201).send(result);
});

export { router as resultRouter };
