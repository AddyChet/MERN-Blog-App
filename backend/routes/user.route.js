import express from "express"
import {signup, login, logout, checkAuth} from "../controllers/user.controller.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
const router = express.Router()

//signup
router.post("/users/signup", signup)
//login
router.post("/users/login", login)
//logout
router.get("/users/logout", authMiddleware, logout)

//checkAuth
router.get("/users/me", authMiddleware, checkAuth)


export default router