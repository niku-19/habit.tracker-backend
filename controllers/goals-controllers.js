import { ErrorMessage, SuccessMessage } from "../const/messageConts.js";
import goalModel from "../models/goal-model.js";

//@desc retrive all goal list
// route GET /v1/api/goals

export const getAllGoals = async (req, res) => {
  try {
    const findAllGoals = await goalModel.find();

    return res.status(200).json({
      message: SuccessMessage.GOAL_LOAD,
      success: true,
      data: findAllGoals,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//@desc add new goal to the list
//route POST /v1/api/goals/add-goal
export const addGoals = async (req, res) => {
  const { goalName, targetDate, description, targetCalories } = req.body;
  try {
    if (!goalName || !targetCalories || !description || !targetDate) {
      return res.status(400).json({
        message: ErrorMessage.MISING_FIELD,
        success: false,
      });
    }
    const newGoal = new goalModel({
      goalName: goalName,
      targetDate: targetDate,
      description: description,
      targetCalories: targetCalories,
    });

    await newGoal.save();

    return res.status(200).json({
      message: SuccessMessage.GOAL_ADDED,
      success: true,
      data: newGoal,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//@desc Removes a fitness goal from the list by its unique ID.
//route DELETE /v1/api/goals/:goalId

export const removeAGoal = async (req, res) => {
  const { goalId } = req.params;
  try {
    if (!goalId) {
      return res.status(400).json({
        message: ErrorMessage.MISING_FIELD,
        success: false,
      });
    }
    await goalModel.findByIdAndDelete({ _id: goalId });

    return res.status(204).json({
      message: SuccessMessage.GOAL_REMOVE,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
