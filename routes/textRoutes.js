import { Router } from "express";
import { getAllText, sendText } from "../controllers/textController.js";

const textRoutes = Router();

textRoutes.get('/', getAllText)
textRoutes.post('/send', sendText)


export {textRoutes}