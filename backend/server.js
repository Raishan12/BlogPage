import express from "express"
import connection from "./connnection.js"

const port = 3000

const app = express()

connection().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server running at http://localhost:${port}`)
    })
})
