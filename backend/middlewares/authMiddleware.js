import jwt from "jsonwebtoken"
import { responseFunction } from "../utils/responseFunction.js";

export const authMiddleware = async (req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token) return responseFunction(400, "Unauthorized Access", res)

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId

        next()
    } catch (error) {
     console.log(`error in authMiddleware: ${error.message}`);
    return responseFunction(500, "Internal server error", res);
    }
}