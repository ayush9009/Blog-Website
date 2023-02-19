import  express  from "express";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.js";
// import { addPost } from "../controllers/post.js";

const router=express.Router()

// router.get("/test",addPost);
    // res.json("this is post"); // ab ye vo hai jo dikege iske liye separate follder bna rai hum i.e controllers

router.get("/",getPosts)
router.get("/:id",getPost)
router.post("/",addPost)
router.delete("/:id",deletePost)
router.put("/:id",updatePost)






export default router





















































