import express from "express"
import { getuser, login, signup, getdata, uploaddata, updatedata } from "../controller/blog.controller.js"
import upload from "../multer/multer.config.js"

const blogRouter = express.Router()

blogRouter.post("/signup", upload.single("file"), signup)
blogRouter.post("/login", login)
blogRouter.get("/user/:id", getuser)
blogRouter.get("/getdata", getdata)
blogRouter.post("/uploaddata",upload.single('image'),uploaddata)
blogRouter.post("/edit/:id", upload.single("photo"), updatedata)

export default blogRouter