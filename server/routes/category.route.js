import { Router } from "express";
import auth from "../middleware/auth.js";
import { addCategoryController, getCategoryController, updateCategoryController } from "../controllers/category.controller.js";

const categoryRouter = Router()

categoryRouter.post("/add-category", auth, addCategoryController)
categoryRouter.get("/get-category", getCategoryController)
categoryRouter.put("/update-category", auth, updateCategoryController)

export default categoryRouter