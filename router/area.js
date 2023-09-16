import { PrismaClient } from "@prisma/client";
import { Router } from "express";
// import { pool } from "../db.js";

// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: "postgres://postgres:qEUVlVu8oHkaYNAE@db.syxiwbfhnnjxokqpoprm.supabase.co:6543/postgres",
//     },
//   },
// });

const prisma = new PrismaClient();

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const provinces = await prisma.thai_provinces.findMany({
      select: {
        name_th: true,
      },
      orderBy: {
        name_th: "asc",
      },
    });
    res.json(provinces);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/amphure/:id", async (req, res) => {
  const provincesId = req.params.id;

  const district = await prisma.thai_amphures.findMany({
    where: {
      provinces: {
        name_th: provincesId,
      },
    },
    select: {
      name_th: true,
    },
    orderBy: {
      name_th: "asc",
    },
  });

  res.json(district);
});

router.get("/tambon/:id", async (req, res) => {
  const districtId = req.params.id;

  const subDistrict = await prisma.thai_tambons.findMany({
    where: {
      amphure: {
        name_th: districtId,
      },
    },
    select: {
      name_th: true,
    },
  });

  res.json(subDistrict);
});

export default router;
