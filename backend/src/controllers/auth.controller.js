import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateTokens } from '../utils/jwt.js';


export const signup = async (req,res) =>{
    try {
        const {fullName, email, password} = req.body;
        if(!fullName || !email || !password) {
            return res.status(400).json({msg: 'Please enter all fields'});
            }


    if(password.length < 6){
        return res.status(400).json({message:"Password should be at least 6 characters long"});
    } 
    const user = await User.findOne({email})

    if(user){
        return res.status(400).json({message:"Email already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    const newUser = new User({
        fullName,
        email,
        password: hashedPassword

    })

if(newUser){
    generateTokens(newUser._id , res)
    await newUser.save()

    return res.status(201).json({
        _id: newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic: newUser.profilePic
    })
}else{
    return res.status(400).json({message:"Invalid user data"})
}
    } catch (error) {
    console.error("Error while signing up the user Controller" , error);
    res.status(500).json({message:"Internal Server Error"})
    }


}


    


export const login = async (req,res) =>{

    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) {
          return res.status(400).json({message:"Invalid Email or Password"})
        } else {
            const isValidPassword = await bcrypt.compare(password , user.password);
            if(!isValidPassword){
                return res.status(400).json({message:"Invalid Email or Password"})
                }

                generateTokens(user._id, res);
                return res.status(200).json({
                    _id:user._id,
                    fullName:user.fullName,
                    email:user.email,
                    profilePic:user.profilePic
                })

        }
          


    } catch (error) {
        console.error("Error in the login controller" , error)
        return res.status(500).json({message: "Internal Server Error"})
        
    }

   




}
export const logout = (req,res) =>{
   try {
    res.cookie("jwt" , "" , {maxAge:0});
    return res.status(200).json({message : "Logged out successfully"} )
   } catch (error) {
    console.error("Error in the logout controller" , error)
    res.status(500).json({message: "Internal Server Error"})
   }
}

export const updateProfile = (req,res) =>{
    try {
        
    } catch (error) {
        console.error("Error in the update profile controller" , error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}