import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);

export default Like;
