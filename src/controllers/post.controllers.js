import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/Post.model.js";

const createPost = asyncHandler(async (req, res) => {
    const { title, body } = req.body;

    if (!(title && body)) {
        throw new ApiError(400, "All fields are required !!!");
    }

    const post = new Post({
        title,
        body,
    });

    const savedPost = await post.save();

    return res
        .status(201)
        .json(new ApiResponse(200, "Post created Successfully", savedPost));
});

const getAllPost = asyncHandler(async (req, res) => {
    const post = await Post.find()
        // .populate("comments")
        // .exec();

    if (!post) {
        throw new ApiError(404, "Post does not exist !!");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, "Fetched all post Successfully", post));
});

export { createPost, getAllPost };
