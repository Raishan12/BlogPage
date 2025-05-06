import express from "express"
import path from "path"
import cors from "cors"
import connection from "./connnection.js"
import blogRouter from "./routes/blog.routes.js"
import dotenv from "dotenv"
dotenv.config()

const port = 5000

const app = express()

app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded())
app.use(cors())

const images = path.resolve("images")
console.log(images)

app.use("/images", express.static(images))

app.use("/api/blog",blogRouter)

connection().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server running at http://localhost:${port}`)
    })
})
