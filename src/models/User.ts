import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      trim: true,
      minlength: 4,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export { User };
