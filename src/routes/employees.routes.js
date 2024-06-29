import express, { Router } from "express";

import * as employee from "../controller/employees.controllers.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.js";

const router = express.Router();





/**
 * @swagger
 * components:
 *   schemas: 
 *     Employee:
 *      type: object
 *      properties:
 *       email:
 *       type: string
 *       format: email
 *       description: email 
 *      name:
 *       type: string
 *      lastName: string
 *      username: string
 *      password: string
 *      role: string    
 *      required:
 *       -email
 *       -name
 *      example:
 *       name: Mauri
 *       email: mauri@gmail.com
 *       lastName: snake
 *       userName: maurisnake
 *       role: ADMIN
 */




/**
 * @swagger
 * /api/employees:
 *  post:
 *    summary: create new employee
 *    tags: [Employee]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *          type: object
 *          $ref: '#/components/schemas/Employee'
 *        example:
 *        name: Mauri
 *        email: mauri@gmail.com
 *    responses:
 *       200:
 *         description: new employee
 *
 */

/**
 * @swagger
 * /api/employees:
 *  get:
 *    summary: return all employees
 *    tags: [Employees]
 *    responses:
 *        200:
 *         description: all employees
 *         content:
 *        application/json:
 *          schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Employee'
 *        
 *
 */

/**
 * @swagger
 * /api/employees/{id}:
 *  get:
 *    summary: return all employee
 *    tags: [Employees]
 *    parameters:
 *      - in: path 
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: return employee
 *    responses:
 *        200:
 *         description: return employee
 *         content:
 *        application/json:
 *          schema:
 *          type: objet
 *          $ref: '#/components/schemas/Employee'
 *        404:
 *          description: employee not found
 *
 */

router.post("/", employee.createEmployee);

router.get("/", employee.getEmployees);

router.get("/:id", employee.getEmployeeById);

router.put("/:id", employee.updateEmployee);

router.delete("/:id", employee.deleteEmployee);

export default router;
