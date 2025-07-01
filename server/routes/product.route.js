import { Router } from "express";
import auth from "../middleware/auth.js";
import { DeleteProductController, GetProductByCategoryAndSubCategoryController, GetProductByCategoryController, GetProductController, GetProductDetailsController, UpdateProductDetailsController, UploadProductController } from "../controllers/product.controller.js";
import { admin } from "../middleware/Admin.js";

const productRouter = Router()

productRouter.post("/add-product", auth, admin, UploadProductController)
productRouter.post("/get-product", GetProductController)
productRouter.post("/get-product-by-category", GetProductByCategoryController)
productRouter.post("/get-product-by-category-and-subCategory", GetProductByCategoryAndSubCategoryController)
productRouter.post("/get-product-details", GetProductDetailsController)
productRouter.put("/update-product-details",auth, admin, UpdateProductDetailsController)
productRouter.delete("/delete-product", auth, admin , DeleteProductController)

export default productRouter