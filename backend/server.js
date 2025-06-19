import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import "dotenv/config"
import blogRouter from "./routes/blog.route.js"
import userRouter from "./routes/user.route.js"
import { connectToDb } from "./utils/connectToDb.js"

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors({
    origin :"http://localhost:5173",
    credentials : true
}))
app.use(cookieParser())

// app.use("/api/v1/", postRouter)
app.use("/api/v1/", userRouter)
app.use("/api/v1/", blogRouter)

app.listen(PORT, ()=> {
    console.log(`server is listening to port ${PORT}`)
    connectToDb()
})