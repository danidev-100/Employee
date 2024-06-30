import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getEmail, getEmailConfirm } from "../middlewares/email.js";

const prisma = new PrismaClient();

export const createEmployee = async (req, res) => {
  try {
    const { name, email, lastName, userName, password, role } = req.body;

    const employee = await prisma.employee.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (employee) {
      return res.status(404).json({ error: "Employees already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newEmployees = await prisma.employee.create({
      data: {
        name,
        lastName,
        userName,
        password: hashed,
        email,
        role,
      },
    });

    // const token = jwt.sign(
    //   {
    //     email: newEmployees.email,
    //     role: newEmployees.role,
    //   },
    //   process.env.SECRET_KEY,
    //   {
    //     expiresIn: "1h",
    //   }
    // );

    // getEmailConfirm(email, name);

    return res
      .status(201)
      .json({ messege: "created successfully", token: token });
  } catch (error) {
    console.log(error);
    res.send({
      messege: "not create employees",
    });
  }

  return res.status(404).json({ messenge: "error fatal" });
};

export const getEmployees = async (req, res) => {
  const employees = await prisma.employee.findMany({
    include:{
      workHours:{
        select:{
          workDate: new Date,
          workIn:true,
          workOut:true
        }
      }
    }
  });

  if (!employees) {
    return res.status(404).json({ error: "Employees not found" });
  }

  res.json(employees);
};

export const getEmployeeById = async (req, res) => {
  const employeeId = await prisma.employee.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!employeeId) {
    return res.status(404).json({ error: "Employee not found" });
  }
  res.json(employeeId);
};

export const deleteEmployee = async (req, res) => {
  const deleteEmployee = await prisma.employee.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!deleteEmployee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.json(deleteEmployee);
};

export const updateEmployee = async (req, res) => {
  const updateEmployee = await prisma.employee.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  });
  if (!updateEmployee) {
    return res.status(404).json({ error: "Employee not updated" });
  }

  return res.status(200).json(updateEmployee);
};
