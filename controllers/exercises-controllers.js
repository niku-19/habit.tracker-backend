import { ErrorMessage, SuccessMessage } from "../const/messageConts.js";
import exerciseModel from "../models/exercise-model.js";

// @desc add new exercise
// route POST /v1/api/fitraho/exercises/add-exercise

export const addExercise = async (req, res) => {
  const { name, duration, calories } = req.body;

  try {
    if (!name || !duration || !calories) {
      return res.status(400).json({
        message: ErrorMessage.MISING_FIELD,
      });
    }
    const newExercise = new exerciseModel({
      name: name,
      duration: duration,
      caloriesBurned: calories,
    });
    await newExercise.save();

    return res.status(200).json({
      message: SuccessMessage.HABIT_ADDED,
      success: true,
      data: newExercise,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// @desc retrive all exercises
// route GET /v1/api/fitraho/exercises

export const getAllExercise = async (req, res) => {
  try {
    const foundExecises = await exerciseModel.find();

    return res.status(200).json({
      message: SuccessMessage.HABIT_LOAD,
      success: true,
      data: foundExecises,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//@desc exercise by its ID
//route /v1/api/fitraho/exercise/:exerciseId

export const deleteExercise = async (req, res) => {
  const { exerciseId } = req.params;

  try {
    if (!exerciseId) {
      return res.status(400).json({
        message: ErrorMessage.MISING_FIELD,
      });
    }
    await exerciseModel.findByIdAndDelete({ _id: exerciseId });
    return res.status(204).json({
      message: SuccessMessage.HABIT_REMOVE,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
