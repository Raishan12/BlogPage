import userSchema from "../models/user.model.js"
import postSchema from "../models/post.model.js"
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

export const getuser = async (req, res) => {
    console.log('getuser fn')
    try {
        const { id } = req.params
        
        const data = await userSchema.findById(id)

        console.log(data)

        res.status(200).send(data)


    } catch (error) {
        console.log(error)
    }
}

export const getdata = async (req, res) => {
    console.log('getuser fn')
    try {
        const data = await postSchema.find()
            .populate('user', 'username photo')

        console.log(data)

        res.status(200).send(data)


    } catch (error) {
        console.log(error)
    }
}

export const uploaddata = async (req, res) => {
    try {
      console.log("uploaddata fn");
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);
  
      const { title, content, user } = req.body;
      const photo = req.file?.filename;

      if (!title || !content || !user || !photo) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const data = await postSchema.create({ title, content, user, photo })

  
      res.status(201).json({ message: "Blog uploaded successfully", data });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Something went wrong", error });
    }
  };
  
  export const updatedata = async (req, res) => {
      console.log(req.body)
      try {
          const { username, email } = req.body;
          const { id } = req.params
          const updatedData = {
              username,
              email,
            };
            if (req.file) {
                updatedData.photo = req.file.filename;
            }
            
            console.log("updatedata function")
            const data = await userSchema.findByIdAndUpdate( id, updatedData, { new: true });
  
      if (!data) return res.status(404).json({ message: "User not found" });
  
      res.json(data);
    } catch (err) {
      console.error("Error updating profile:", err);
      res.status(500).json({ message: "Failed to update profile" });
    }
  }