import mongoose from "mongoose"

export default async function connection() {
    const db = mongoose.connect("mongodb://localhost:27017/blogpageDB")
    console.log("DataBase Connected")
    return db
}