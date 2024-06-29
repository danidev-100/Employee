
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export  const createUsers =  async (req, res) => {
    const newUsers = await prisma.user.create({
      data: req.body,
    });
   
    res.json(newUsers);
  }


export  const getUsers =   async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
   
  }

  export const getUsersByid = async (req, res) => {
    const users = await prisma.user.findFirst({
      where:{
          id: Number(req.params.id),
      }
    });
    res.json(users);
  }

  export const deletedUsers = async (req, res) => {
    const usersDeleted = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
  
    if (!usersDeleted) {
      return res.status(403).json({ error: "User deleted no founs" });
    }
    return res.json(usersDeleted);
  }

  export const updateUsers =  async (req, res) => {
    const usersUpdated = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    return res.json(usersUpdated);
  }