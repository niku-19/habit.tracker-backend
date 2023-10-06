import exercisesSchema from "../models/exercise-model.js";

export const createNewExercise = async (req, res) => {
  try {
    const { exerciseName, exerciseDuration, caloriesBurnRate } = req.body;

    if (!exerciseName || !exerciseDuration || !caloriesBurnRate) {
      return res.status(400).json({
        statusCode: 400,
        message: `Bad request Required Feild Missing`,
        success: false,
        data: null,
      });
    }

    const found = await exercisesSchema.findOne({ exerciseName: exerciseName });

    if (found) {
      return res.status(403).json({
        statusCode: 403,
        message: `Exercises already added! please try with different payload`,
        success: false,
        data: null,
      });
    }

    const newExercise = new exercisesSchema({
      exerciseName,
      exerciseDuration,
      caloriesBurnRate,
    });

    const result = await newExercise.save();

    if (!result || result.length < 1) {
      return res.status(202).json({
        statusCode: 202,
        message: `Exercise not added!`,
        success: false,
        data: null,
      });
    }

    return res.status(201).json({
      statusCode: 201,
      message: `Exercise added Successfully`,
      success: false,
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      message: `Error occured : ${err.message}`,
      success: false,
      data: null,
    });
  }
};

export const getAllExercises = async (req, res) => {
  try {
    const exercises = await exercisesSchema.find();

    if (!exercises || exercises.length < 1) {
      return res.status(404).json({
        statusCode: 404,
        message: `exercises not found`,
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: `exercises found`,
      success: false,
      data: exercises,
    });
  } catch (err) {
    return res.status(500).json({
      statusCode: err.status,
      message: `error occured : ${err.message}`,
      success: false,
      data: null,
    });
  }
};
export const deleteExerciesById = async (req, res) => {
  try {
    const { exerciseId } = req.params;

    if (!exerciseId) {
      return res.status(400).json({
        statusCode: 400,
        message: `Bad request missing exercise id as params`,
        success: false,
        data: null,
      });
    }

    const exercises = await exercisesSchema.findOne({ _id: exerciseId });

    if (!exercises || exercises.length < 1) {
      return res.status(404).json({
        statusCode: 404,
        message: `exercises not found`,
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: `exercises deleted successfully`,
      success: false,
      data: exercises,
    });
  } catch (err) {
    return res.status(500).json({
      statusCode: err.status,
      message: `error occured : ${err.message}`,
      success: false,
      data: null,
    });
  }
};
