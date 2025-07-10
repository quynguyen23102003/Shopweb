export const baseURL = "http://localhost:3000/"

const SummaryApi = {
    register: {
        url: '/api/user/register',
        method: 'post'
    },
    login: {
        url: '/api/user/login',
        method: 'post'
    },
    forgot_password: {
        url: '/api/user/forgot-password',
        method: 'put'
    },
    forgot_password_otp_verification: {
        url: '/api/user/verify-forgot-password-opt',
        method: 'put'
    },
    reset_password: {
        url: '/api/user/reset-password',
        method: 'put'
    },
    refreshToken: {
        url: '/api/user/refrech-token',
        method: 'post'
    },
    userDetails: {
        url: '/api/user/user-details',
        method: 'get'
    },
    logout: {
        url: '/api/user/logout',
        method: 'get'
    },
    uploadAvatar: {
        url: '/api/user/upload-avatar',
        method: 'put'
    },
    updateUserDetails: {
        url: '/api/user/update-user',
        method: 'put'
    },
    // category
    addCategory: {
        url: '/api/category/add-category',
        method: 'post'
    },
    uploadImage: {
        url: '/api/file/upload',
        method: 'post'
    },
    getCategory: {
        url: '/api/category/get-category',
        method: 'get'
    },
    updateCategory: {
        url: 'api/category/update-category',
        method: 'put'
    },
    deleteCategory: {
        url: 'api/category/delete-category',
        method: 'delete'
    },
    // subCategory
    addSubCategory: {
        url: 'api/subCategory/add-subCategory',
        method: 'post'
    },
    getSubCategory: {
        url: 'api/subCategory/get-subCategory',
        method: 'get'
    },
    updateSubCategory: {
        url: 'api/subCategory/update-subCategory',
        method: 'put'
    },
    deleteSubCategory: {
        url: 'api/subCategory/delete-subCategory',
        method: 'delete'
    },
    // Product
    addProduct: {
        url: 'api/product/add-product',
        method: 'post'
    },
    getProduct: {
        url: 'api/product/get-product',
        method: 'post'
    },
    getProductByCategory: {
        url: 'api/product/get-product-by-category',
        method: 'post'
    },
    getProductByCategoryAndSubCategory: {
        url: 'api/product/get-product-by-category-and-subCategory',
        method: 'post'
    },
    getProductDetails: {
        url: 'api/product/get-product-details',
        method: 'post'
    },
    updateProductDetails: {
        url: 'api/product/update-product-details',
        method: 'put'
    },
    deleteProduct: {
        url: 'api/product/delete-product',
        method: 'delete'
    },
    searchProduct: {
        url: 'api/product/search-product',
        method: 'post'
    },
    // cart
    addToCart: {
        url: 'api/cart/create',
        method: 'post'
    },
    getToCart: {
        url: 'api/cart/get',
        method: 'get'
    },
    updateQty: {
        url: 'api/cart/update-qty',
        method: 'put'
    },
    deleteCartItem: {
        url: 'api/cart/delete',
        method: 'delete'
    },
    // address
    addAddress: {
        url: 'api/address/create',
        method: 'post'
    },
    getAddress: {
        url: 'api/address/get',
        method: 'get'
    },
    updateAddress: {
        url: 'api/address/update',
        method: 'put'
    },
    deleteAddress: {
        url: 'api/address/delete',
        method: 'delete'
    }
}

export default SummaryApi