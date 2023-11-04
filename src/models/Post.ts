import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      text: { type: String, required: true },
      _id: false,
    },
    // { _id: false },
  ],
});

const Post = mongoose.model("Post", postSchema);

export { Post };
