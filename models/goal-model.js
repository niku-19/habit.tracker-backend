import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    goalName: {
      type: String,
      require: true,
    },
    goalDesc: {
      type: String,
      require: true,
    },
    targetData: {
      type: String,
      require: true,
    },
    targetCaloriesValue: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("goal", goalSchema);
