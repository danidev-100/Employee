import express from "express";

import * as hours from "../controller/workhours.controllers.js";

const router =  express.Router();

router.post("/", hours.works);
router.get("/", hours.gethours);

export default router;
