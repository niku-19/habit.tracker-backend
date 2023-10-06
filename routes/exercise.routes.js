import express from "express";
import {
  createNewExercise,
  deleteExerciesById,
  getAllExercises,
} from "../controllers/exercises-controllers.js";

const Router = express.Router();

Router.get("/exercises/exercises", getAllExercises);
Router.post("/exercises/add-exercise", createNewExercise);
Router.delete("/exercises/:exerciseId", deleteExerciesById);

export default Router;
