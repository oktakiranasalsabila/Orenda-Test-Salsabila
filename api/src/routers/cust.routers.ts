import {Router} from "express";
import CustomerController from "../controllers/cust.controller";

class CustomerRoutes{
    router = Router();
    controller = new CustomerController();

    constructor(){
        this.initializeRoutes();
    }
    initializeRoutes(){
        this.router.post("/",this.controller.create);
        this.router.get("/",this.controller.getAllCustomer);
        this.router.get("/:id",this.controller.getCustomerById);
        this.router.patch("/:id",this.controller.update);
        this.router.delete("/:id",this.controller.delete);
    }
}

export default new CustomerRoutes().router;