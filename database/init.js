import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://nikhilRanjanKumar:NikhilKumar@neog.mhamuky.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err.message));
