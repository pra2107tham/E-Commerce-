import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if(!token){
            return res
            .status(400)
            .json({message: "User not authenticated"});
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err){
                return res
                .status(400)
                .json({message: "User not authenticated"});
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res
        .status(500)
        .json({message: error.message});
    }
}

export default auth;