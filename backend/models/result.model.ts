import mongoose from "mongoose";

// typage du result
interface IResult {
  score: number;
  time: number;
  date: Date;
}

// définition du schéma de notre donnée. 
const resultSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  time: { type: Number, required: true },
  date: { type: Date, required: true },
});


export const Result = mongoose.model<IResult>(
  "Result",
  resultSchema
);
