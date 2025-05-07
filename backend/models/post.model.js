import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  photo: { type: String, required: true }
});

export default mongoose.models.Blogs || mongoose.model("Blogs", postSchema);
