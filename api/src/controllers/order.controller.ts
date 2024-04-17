import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default class orderController {
  async create(req: Request, res: Response) {
    try {
      const { CustId, totOrder, discount } = req.body;
      const result = await prisma.order.create({
        data: {
          totOrder: totOrder,
          discount: discount,
          customer: {
            connect: {
              custId: CustId,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Server Error!",
      });
    }
  }
  async getDetailOrder(req: Request, res: Response) {
    try {
      const orId = parseInt(req.params.id);
      const detailOrder = await prisma.detailOrder.findMany({
        where: {
          OrId: orId,
        },
        include: {
          order: true,
          product: true,
        },
      });
      if (detailOrder) {
        res.status(201).json(detailOrder);
      } else {
        res.status(404).json({
          message: "Detail Order tidak di temukan",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Server Error!",
      });
    }
  }
}
