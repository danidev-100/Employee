import { CorporateGroupUnlinkGroupIdSubAccountsPutRequest } from "@getbrevo/brevo";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const works = async (req, res) => {
  const { employeeId, workDate, workIn, workOut } = req.body;
  try {
    // Calcula las horas trabajadas
    const start = new Date(workIn);
    const end = new Date(workOut);
    const hourCount = (end - start) / (1000 * 60 * 60);

    const newWorkHours = await prisma.workHours.create({
      data: {
        employeeId,
        workDate: new Date(workDate),
        workIn: new Date(workIn),
        workOut: new Date(workOut),
        hourCount,
      },
    });
    res.json(newWorkHours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const gethours = async (work, workO) => {
  try {
    const workHours = await prisma.workHours.groupBy({
      by: ["employeeId","workDate","workIn","workOut"],

      _sum: {
        hourCount: true,
      },  where: {
        workDate: {
          gte: new Date(work),
          lte: new Date(workO),
        },
      },
      orderBy:{
        workDate: "asc"
      }

    });

    console.log("las horas trabajdas desde ",work, "hasta",workO,workHours);
    return workHours
  } catch (error) {
  console.log(error);
  }

};
// gethours("2023-01-18 11:00:00.000","2024-12-18 11:00:00.000");
