import express from "express";
import {
  addFood,
  getAllFoods,
  removeFood,
} from "../controllers/food-controllers.js";

const FoodRouter = express.Router();

FoodRouter.get("/foods", getAllFoods);
FoodRouter.post("/foods/add-food", addFood);
FoodRouter.delete("/foods/:foodId", removeFood);

export default FoodRouter;
