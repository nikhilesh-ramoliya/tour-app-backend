import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const a = jwt.verify(token, process.env.SECRETEJWT, { algorithm: ['RS256'] })

        const isCustomAuth = token.length < 500;
        if (token && isCustomAuth) {
            req.userId = a?.id;
        } else {
            const googleId = a.sub.toString()
            const user = await UserModel.findOne({ googleId });
            req.userId = user?._id;
        }
        next();
    } catch (error) {
        console.log(error)
        res.send("error")
    }
}

