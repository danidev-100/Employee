import express, { Router } from "express";
import * as employ from "../controller/auth.controllers.js"
import { verifyAdmin, verifyToken } from "../middlewares/jwt.js";
import * as employes from "../controller/employees.controllers.js"

const router = express.Router();



router.post("/", employ.loginEmployees)
router.get("/", employ.profileEmployye)
router.get("/", employes.getEmployees )


export default router