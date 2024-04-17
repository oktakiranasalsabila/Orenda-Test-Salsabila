import {Router} from "express";
import ProductController from "../controllers/prod.controller";

class ProductRoutes{
    router = Router();
    controller = new ProductController();

    constructor(){
        this.initializeRoutes();
    }
    initializeRoutes(){
        this.router.post("/",this.controller.create);
        this.router.get("/",this.controller.getAllProduct);
        this.router.get("/:id",this.controller.getProductById);
        this.router.patch("/:id",this.controller.update);
        this.router.delete("/:id",this.controller.delete);
    }
}

export default new ProductRoutes().router;