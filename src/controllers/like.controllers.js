import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/Post.model.js";
import { Like } from "../models/Likes.model.js";

const likePost = asyncHandler(async (req, res) => {
    const { post, user } = req.body;

    if (!(post && user)) {
        throw new ApiError(400, "All fields are required !!");
    }

    const like = new Like({
        post,
        user,
    });

    const savedLike = await like.save();

    const updatedPost = await Post.findByIdAndUpdate(
        post,
        {
            $push: {
                likes: savedLike._id,
            },
        },

        { new: true }
    );

    return res
        .status(201)
        .json(
            new ApiResponse(200, "Post likes updated Successfully", updatedPost)
        );
});

const dislikePost = asyncHandler(async (req, res) => {
    const { like, post } = req.body;

    if (!(like && post)) {
        throw new ApiError(400, "All fields are requried");
    }

    // TODO: find and delete the like Collection
    const deleteLike = await Like.findOneAndDelete({
        post: post,
        _id: like,
    });

    if (!deleteLike) {
        throw new ApiError(404, "like not found");
    }

    // TODO: update post collection
    const updatedPost = await Post.findByIdAndUpdate(
        post,
        {
            $pull: {
                likes: deleteLike._id,
            },
        },
        { new: true }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, "disLike the Post Successfully", updatedPost)
        );
});

export { likePost, dislikePost };
