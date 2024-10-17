import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/Post.model.js";
import { Comment } from "../models/Comment.model.js";

const createComment = asyncHandler(async (req, res) => {
    const { post, body, user } = req.body;

    if (!(post && body && user)) {
        throw new ApiError(400, "All fields are required !!");
    }

    //TODO: Create a comment Object
    const comment = new Comment({
        post,
        user,
        body,
    });

    //TODO: Save the comment into database
    const savedComment = await comment.save();

    //TODO: find the post by Id, add the new comment in its comments Array
    const updatedPost = await Post.findByIdAndUpdate(
        post,
        {
            $push: {
                comments: savedComment._id,
            },
        },
        { new: true }
    )
        .populate("comments")
        .exec();

    return res
        .status(201)
        .json(new ApiResponse(200, "Comment Added successfully", updatedPost));
});

export { createComment };
