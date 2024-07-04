import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

    

export const loginEmployees = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ error: "email or password no foud" });
    }

    const employee = await prisma.employee.findUnique({
      where: {
        email,
      },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employees not found" });
    }

    const resul = await bcrypt.compare(password, employee.password);
    if (!resul) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        email: employee.email,
        role: employee.role
        
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      msg: token,
      message:"loging to employee"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error server response" });
  }

  
};

export const profileEmployye = async(req, res) =>{

  try {
    
      const employee = await prisma.employee.findUnique({
        where:{
          email: req.email
        }
      })
      return res.json({ msg:"oka perfile employee", user: employee.userName})

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error server response" })
    
  }
}

// export const findAll = async(req, res) =>{

//   try {
//     const employeesAll = await prisma.employee.findMany()

//    return  res.json({ employeesAll})


//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: "error server response" })
//   }

// }

