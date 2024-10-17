import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },

        user: {
            type: String,
            required: true,
        },

        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export { Comment };
