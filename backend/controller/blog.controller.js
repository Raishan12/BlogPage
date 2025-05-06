import userSchema from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    console.log("signup function")
    console.log(req.body)
    try {
        const photo = req.file.filename
        console.log(photo)
        const { username, email, password } = req.body

        const userExist = await userSchema.findOne({ email })

        if( userExist )
            return res.status(401).send({ message: "User already exist" })

        bcrypt.hash(password, 10).then( async (hashedpassword) => {
            console.log(hashedpassword)
            const data = await userSchema.create({ username, email, photo, password: hashedpassword })
            const token = await jwt.sign({ id: data._id }, process.env.JWT_KEY, { expiresIn: "10h" })
            res.status(201).send({ message: "Account Created", data, token })
        } )

    } catch (error) {
        console.log(error)
        res.status(500).send({message: "Signup Failed", error})
    }
}

export const login = async (req, res) => {
    console.log("login function")
    console.log(req.body)
    try {
        const { email, password } = req.body

        const userExist = await userSchema.findOne({ email })

        if(!userExist)
            return res.status(401).send({ message: "User does not exist" })

        const isPasswordMatch = await bcrypt.compare(password, userExist.password)

        if(!isPasswordMatch)
            return res.status(401).send({ message: "Incorrect Password" })

        const token = jwt.sign({ id: userExist._id }, process.env.JWT_KEY, { expiresIn: "10h" } )

        res.status(200).send({message: "Login Success", id: userExist._id, token })

    } catch (error) {
        res.status(500).send({message: "Internal Error", error})
    }
}
