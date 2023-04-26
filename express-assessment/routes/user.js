import express from "express";
import prisma from "../db/index.js";

const router = express.Router();

// Create the routes here

router.get("", async (req, res) => {
  const users = await prisma.user.findMany({
    where: { isActive: true },
  });
  res.json({ success: true, users: Array.from(users) });
});

router.post("", async (req, res) => {
  const { firstName, lastName } = req.body;
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
    },
  });
  res.status(201).json({ success: true });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, isAdmin, isActive } = req.body;
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      firstName,
      lastName,
      isAdmin,
      isActive,
    },
  });
  res.json({ success: true });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.json({ success: true });
});

router.get("/admins", async (req, res) => {
  const users = await prisma.user.findMany({
    where: { isActive: true, isAdmin: true },
  });
  res.json({ success: true, users: Array.from(users) });
});

export default router;
