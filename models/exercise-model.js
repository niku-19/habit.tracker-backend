import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    exerciseName: {
      type: String,
      require: true,
    },
    exerciseDuration: {
      type: Number,
      require: true,
    },
    caloriesBurnRate: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

exerciseSchema.virtual("calories").get(function () {
  return this.exerciseDuration * this.caloriesBurnRate;
});

export default mongoose.model("exercise", exerciseSchema);
