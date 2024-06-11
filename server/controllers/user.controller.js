import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
           return res
            .status(400)
            .json({message: "User already exists"});
        }

        // Hash password
        const hashpassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({name, email, password:hashpassword});
        const accessToken = generateAccessToken(createdUser._id);
        const refreshToken = generateRefreshToken(createdUser._id);

        if(!createdUser){
            return res
            .status(400)
            .json({message: "Something went wrong during user creation"});
        }else{
            return res
            .status(201)
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                path: "/api/users/refresh_token"
            })
            .json({
                message: "User created successfully",
                access: accessToken
            })
            
        }

    } catch (error) {
        return res
        .status(500)
        .json({message: error.message});
    }
}

const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res
            .status(400)
            .json({message: "User not authenticated"});
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err){
                return res
                .status(400)
                .json({message: "User not authenticated"});
            }
            const accessToken = generateAccessToken(user);
            return res
            .json({access: accessToken});
        });
    } catch (error) {
        return res.
        status(500)
        .json({message: error.message});
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res
            .status(400)
            .json({message: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res
            .status(400)
            .json({message: "Invalid password"});
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res
        .status(200)
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "/api/users/refresh_token"
        })
        .json({
            accessToken : accessToken,
            message: "Login successful"
        });
    } catch (error) {
        return res
        .status(500)
        .json({message: error.message});
    }
}

const logoutUser = async(req,res) => {
    try {
        return res.clearCookie("refreshToken", {path: "/api/users/refresh_token"})
        .json({message: "Logged out successfully"});
    }catch(error){
        return res
        .status(500)
        .json({message: error.message});
    }
}

const getUser = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res
            .status(400)
            .json({message: "User not found"});
        }
        return res
        .status(200)
        .json(user);
    }catch(error){
        return res
        .status(500)
        .json({message: error.message});
    }}









const generateAccessToken = (user) => {
    return jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d"
    });
}
const generateRefreshToken = (user) => {
    return jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    });
}

export {registerUser, refreshToken, loginUser, logoutUser, getUser}