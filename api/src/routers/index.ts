import { Application } from "express";
import ProductRoutes from "./prod.routers";
import CustomerRoutes from "./cust.routers";

export default class Routes{
    constructor(app: Application){
        app.use("/product", ProductRoutes);
        app.use("/customer", CustomerRoutes);
        app.use("/order", CustomerRoutes);
    }
}