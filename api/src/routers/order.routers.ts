import {Router} from "express";
import OrderController from "../controllers/order.controller";

class OrderRoutes{
    router = Router();
    controller = new OrderController();

    constructor(){
        this.initializeRoutes();
    }
    initializeRoutes(){
        this.router.post("/",this.controller.create);
        this.router.get("/:id",this.controller.getDetailOrder);
       
    }
}

export default new OrderRoutes().router;