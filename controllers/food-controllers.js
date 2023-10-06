import foodModel from "../models/food-model.js";
import { ErrorMessage, SuccessMessage } from "../const/messageConts.js";
//@desc retrive all food data
// route /v1/api/foods
export const getAllFoods = async (req, res) => {
  try {
    const foundFood = await foodModel.find().select("-__v");

    if (foundFood) {
      return res.status(404).json({
        statusCode: 404,
        message: `Food not found`,
        status: false,
        code: null,
      });
    }

    return res.status(200).json({
      message: SuccessMessage.FOOD_LOAD,
      success: true,
      data: foundFood,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//@desc add food data
//route POST /v1/api/foods/add-food

export const addFood = async (req, res) => {
  const { foodName, calories, protien, fat, carbohydrate } = req.body;
  console.log(carbohydrate);
  try {
    if (!foodName || !calories || !protien || !fat || !carbohydrate) {
      return res.status(400).json({
        message: ErrorMessage.MISING_FIELD,
        success: false,
      });
    }

    const newFood = new foodModel({
      foodName: foodName,
      calories: parseInt(calories),
      protein: parseInt(protien),
      fat: parseInt(fat),
      carbohydrate: +carbohydrate,
    });

    const savedData = await newFood.save();
    if (!savedData) {
      return res.status(403).json({
        message: ErrorMessage.SOMETHING_WRONG,
        success: false,
      });
    } else {
      return res.status(200).json({
        message: SuccessMessage.FOOD_ADDED,
        success: true,
        data: savedData,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//@desc Removes a food item from the list by its unique ID
// route DELETE /v1/api/foods/:foodId

export const removeFood = async (req, res) => {
  const { foodId } = req.params;
  try {
    if (!foodId) {
      return res.status(400).json({
        message: ErrorMessage.MISING_FIELD,
        success: false,
      });
    }
    await foodModel.findByIdAndDelete({ _id: foodId });

    return res.status(204).json({
      message: SuccessMessage.FOOD_REMOVE,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
