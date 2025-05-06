import express from "express"
import { login, signup } from "../controller/blog.controller.js"
import upload from "../multer/multer.config.js"

const blogRouter = express.Router()

blogRouter.post("/signup", upload.single("file"), signup)
blogRouter.post("/login", login)

export default blogRouter