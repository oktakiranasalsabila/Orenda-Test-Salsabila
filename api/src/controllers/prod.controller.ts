import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class ProductController {
  async create(req: Request, res: Response) {
    try {
      const { name, unit, price } = req.body;
      const result = await prisma.product.create({
        data: {
          name,
          unit,
          price,
        },
      });
      res.status(200).json({
        message: "Data Product Berhasil di tambahkan",
        result,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
  async getAllProduct(req: Request, res: Response) {
    try {
      const result = await prisma.product.findMany();
      res.status(201).json({
        message: "Menampilkan semua data Product berhasil",
        result,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error!",
      });
    }
  }
  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await prisma.product.findUnique({
        where: { proId: Number(id) || undefined },
      });
      res.status(201).json({
        message: "getProductById OK",
        result,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error!",
      });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, unit, price } = req.body;
      const updateProduct = await prisma.product.update({
        where: { proId: Number(id) || undefined },
        data: { name, unit, price },
      });
      res
        .status(200)
        .json({ message: "data Product berhasil di update", updateProduct });
    } catch (error) {
      res.status(500).json({
        message: "Server Error!",
      });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleteProduct = await prisma.product.delete({
        where: { proId: Number(id) || undefined },
      });
      res.status(200).json({
        message: "data Product berhasil di hapus",
        deleteProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error!",
      });
    }
  }
}
