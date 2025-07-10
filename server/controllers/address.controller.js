import AddressModel from '../models/address.model.js'
import UserModel from '../models/user.model.js'

export const addAddressController = async (request, response) => {
    try {
        const userId = request.userId
        const { address_line, city, state, pincode, country, mobile } = request.body

        const createAddress = new AddressModel({
            address_line,
            city,
            state,
            pincode,
            country,
            mobile, 
            userId: userId 
        })
        const saveAddress = await createAddress.save()

        const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
            $push: {
                address_details: saveAddress._id
            }
        })

        return response.json({
            message: "Address Created Successfully",
            error: false,
            success: true,
            data: saveAddress
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
} 

export const getAddressController = async (request, response) => {
    try {
        const userId = request.userId

        const data = await AddressModel.find({
            userId: userId
        }).sort({ createdAt : -1 })

        return response.json({
            data: data,
            message: "List of address",
            error: false,
            success: true
        })
    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateAddressController = async (request, response) => {
    try {
        const userId = request.userId

        const { _id, address_line, city, state, pincode, country, mobile } = request.body

        if (!_id) {
            return response.status(400).json({
                message: "provide _id"
            })
        }

        const updateAddress = await AddressModel.updateOne({ 
            _id: _id,
            userId: userId
        }, {
            address_line,
            city,
            state,
            pincode,
            country,
            mobile, 
        })

        return response.json({
            message: "Address Updated",
            error: false,
            success: true,
            data: updateAddress
        })
    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const deleteAddressController = async (request, response) => {
    try {
        const userId = request.userId

        const { _id } = request.body

        if (!_id) {
            return response.status(400).json({
                message: "provide _id",
                error: true,
                success: false
            })
        }

        // const deleteAddress = await AddressModel.deleteOne({ _id : _id, userId: userId})

        const deleteAddress = await AddressModel.updateOne({ _id: _id, userId}, {
            status: false
        })

        return response.json({
            message: "Address remove",
            error: false,
            success: true,
            data: deleteAddress
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}