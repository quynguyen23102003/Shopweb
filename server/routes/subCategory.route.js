import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddSubCategoryController, DeleteSubCategoryController, GetSubCategoryController, UpdateSubCategoryController } from "../controllers/subCategory.controller.js";

const subCategoryRouter = Router()

subCategoryRouter.post("/add-subCategory", auth, AddSubCategoryController)
subCategoryRouter.get("/get-subCategory", GetSubCategoryController)
subCategoryRouter.put("/update-subCategory", auth, UpdateSubCategoryController)
subCategoryRouter.delete("/delete-subCategory", auth, DeleteSubCategoryController)

export default subCategoryRouter