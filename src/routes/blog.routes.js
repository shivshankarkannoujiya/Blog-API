import { Router } from "express";
import { createPost, getAllPost } from "../controllers/Post.controllers.js";
import { createComment } from "../controllers/Comment.controllers.js";

const router = Router();

router.route("/post/create").post(createPost);
router.route("/comment/create").post(createComment);
router.route("/posts").get(getAllPost);

export default router;
