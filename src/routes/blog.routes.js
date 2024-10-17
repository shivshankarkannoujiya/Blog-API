import { Router } from "express";
import { createPost } from "../controllers/Post.controllers.js";
import { createComment } from "../controllers/Comment.controllers.js";

const router = Router()

router.route("/post/create").post(createPost)
router.route("/comment/create").post(createComment)

export default router