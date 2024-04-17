import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CustomerController {
  async create(req: Request, res: Response) {
    try {
      const { name, phone, email, address } = req.body;
      const result = await prisma.customer.create({
        data: {
          name,
          phone,
          email,
          address,
        },
      });
      res.status(200).json({
        message: "Menambahkan data Customer berhasil",
        result,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
  async getAllCustomer(req: Request, res: Response) {
    try {
      const result = await prisma.customer.findMany();
      res.status(201).json({
        message: "Menampilkan semua data Customer berhasil",
        result,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error!",
      });
    }
  }
  async getCustomerById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await prisma.customer.findUnique({
        where: { custId: Number(id) || undefined },
      });
      res.status(201).json({
        message: "getCustomerById OK",
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
      const { name, phone, email, address } = req.body;
      const updateCustomer = await prisma.customer.update({
        where: { custId: Number(id) || undefined },
        data: { name, phone, email, address },
      });
      res.status(200).json({
        message: " data Customer berhasil di update",
        updateCustomer,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error!",
      });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleteCustomer = await prisma.customer.delete({
        where: { custId: Number(id) || undefined },
      });
      res.status(200).json({
        message: "data Customer berhasil di hapus",
        deleteCustomer,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error!",
      });
    }
  }
}
