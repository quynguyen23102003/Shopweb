import ProductModel from '../models/product.model.js'

export const UploadProductController = async (request, response) => {
    try {
        const {
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        } = request.body

        if (!name || !image[0] || !category[0] || !subCategory[0] || !unit || !price || !description) {
            return response.status(400).json({
                message: "Enter required fields",
                error: true,
                success: false
            })
        }

        const addProduct = new ProductModel({
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        })

        const saveProduct = await addProduct.save()

        if (!saveProduct) {
            return response.status(500).json({
                message: "Not Created",
                error: true,
                success: false
            })
        }

        return response.json({
            message: "Add Product Successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const GetProductController = async (request, response) => {
    try {
        let { page, limit, search } = request.body

        if (!page) {
            page = 1
        }

        if (!limit) {
            limit = 10
        }

        const query = search ? {
            $text: {
                $search: search
            }
        } : {}

        const skip = (page - 1) * limit

        const [data, totalCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message: "Product Data",
            error: false,
            success: true,
            totalCount: totalCount,
            totalNoPage: Math.ceil(totalCount / limit),
            data: data
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const GetProductByCategoryController = async (request, response) => {
    try {
        const { id } = request.body

        if (!id) {
            return response.status(400).json({
                message: "Provide category id",
                error: true,
                success: false
            })
        }

        const product = await ProductModel.find({
            category: { $in: id }
        }).limit(15)

        return response.json({
            message: "Category product list",
            data: product,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const GetProductByCategoryAndSubCategoryController = async (request, response) => {
    try {
        const { categoryId, subCategoryId, page, limit } = request.body

        if (!categoryId || !subCategoryId) {
            return response.status(400).json({
                message: "Provide categoryId and subcategoryId",
                error: true,
                success: false
            })
        }

        if (!page) {
            page = 1
        }

        if (!limit) {
            limit = 10
        }

        const query = {
            category: { $in: categoryId },
            subCategory: { $in: subCategoryId }
        }

        const skip = (page - 1) * limit

        const [data, dataCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip().limit(limit),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message: "Product list",
            error: false,
            success: true,
            data: data,
            totalCount: dataCount,
            page: page,
            limit: limit,
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const GetProductDetailsController = async (request, response) => {
    try {
        const { productId } = request.body

        const product = await ProductModel.findOne({ _id: productId })

        return response.json({
            message: "product details",
            error: false,
            success: true,
            data: product
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const UpdateProductDetailsController = async (request, response) => {
    try {
        const { _id } = request.body

        if (!_id) {
            return response.status(400).json({
                message: "Provide product _id",
                error: true,
                success: false
            })
        }

        const updateProduct = await ProductModel.updateOne({ _id: _id }, {
            ...request.body
        })

        return response.json({
            message: "Update successfully",
            data: updateProduct,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

export const DeleteProductController = async (request, response) => {
    try {
        const { _id } = request.body

        if (!_id) {
            return response.status(400).json({
                message: "provide _id",
                error: true,
                success: false
            })
        }

        const deleteProduct = await ProductModel.deleteOne({ _id: _id })

        return response.json({
            message: "Delete product successfully",
            error: false,
            success: true,
            data: deleteProduct
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}