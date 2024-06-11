import User from '../models/userModel.js';

const authAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if(user.isAdmin === 0){
            return res
            .status(400)
            .json({message: "Admin resources access denied"});
        }
        next(); 
    }
    catch (error) {
        return res
        .status(500)
        .json({message: error.message});
    }
}

export default authAdmin;