import { Router } from "express";
import { login, register, userProfile } from "../controllers/userController.js";

const userRoute = Router();


userRoute.post('/register', register)
userRoute.post('/login', login)
userRoute.get('/profile', userProfile)

export { userRoute }