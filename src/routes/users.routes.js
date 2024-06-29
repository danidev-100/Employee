import express, { Router } from "express";

import * as controllerUser from "../controller/users.controllers.js"

const router = express.Router();



router.post("/",controllerUser.createUsers);


router.get("/",controllerUser.getUsers);


router.get("/:id",controllerUser.getUsersByid);



router.delete("/:id",controllerUser.deletedUsers );


router.put("/:id",controllerUser.updateUsers);



export default router;



