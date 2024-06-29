import express, { Router } from "express";
import * as employ from "../controller/auth.controllers.js"
import { verifyAdmin, verifyToken } from "../middlewares/jwt.js";

const router = express.Router();



router.post("/",verifyToken, employ.loginEmployees)
router.get("/", verifyToken, employ.profileEmployye)
//router.get("/", verifyToken, verifyAdmin,employ.findAll)


export default router