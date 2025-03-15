import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import generatedAccessToken from '../utils/generatedAccessToken.js'
import generatedRefreshToken from '../utils/generatedRefreshToken.js'
import uploadImageCloudinary from '../utils/uploadImageClodinary.js'
import generatedOtp from '../utils/generatedOtp.js'
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js'
import jwt from 'jsonwebtoken'

export async function registerUserController(request, response) {
    try {
        const { email, name, password } = request.body

        if (!email || !name || !password) {
            return response.status(400).json({
                message: "provide email, name, password",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (user) {
            return response.status(400).json({
                message: 'Already register email',
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            email,
            name,
            password: hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from NguyenPhucQuy",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        })

        return response.json({
            message: "User register successfully",
            error: false,
            success: true,
            date: save
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function verifyEmailController(request, response) {
    try {
        const { code } = request.body

        const user = await UserModel.findOne({ _id: code })

        if (!user) {
            return response.status(400).json({
                message: "Invalid code",
                error: true,
                success: false
            })
        }

        const updateUser = await UserModel.updateOne({ _id: code }, {
            verify_email: true
        })

        return response.json({
            message: "Verify email done",
            success: true,
            error: false
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: true
        })
    }
}

// login controller
export async function loginController(request, response) {
    try {
        const { email, password } = request.body

        if (!email || !password) {
            response.status(400).json({
                message: "provide email, password",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(500).json({
                message: "User not regidter",
                error: true,
                success: false
            })
        }

        if (user.status !== "Active") {
            return response.status(400).json({
                message: "Contact to Admin",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcryptjs.compare(password, user.password)

        if (!checkPassword) {
            return response.status(400).json({
                message: "Check your password",
                error: true,
                success: false
            })
        }

        const accessToken = await generatedAccessToken(user._id)
        const refreshToken = await generatedRefreshToken(user._id)

        const cookiesOption = {
            http: true,
            secure: true,
            sameSite: "None"
        }

        response.cookie('accessToken', accessToken, cookiesOption)
        response.cookie('refreshToken', refreshToken, cookiesOption)

        return response.json({
            message: "Login successfully",
            error: false,
            success: true,
            date: {
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// logout controller
export async function logoutController(request, response) {
    try {
        const userid = request.userId // middleware

        const cookiesOption = {
            http: true,
            secure: true,
            sameSite: "None"
        }
        response.clearCookie("accessToken", cookiesOption)
        response.clearCookie("refreshToken", cookiesOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
            refresh_token: ""
        })

        return response.json({
            message: "Logout successfully",
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

// upload user avatar
export async function uploadAvatar(request, response) {
    try {
        const userId = request.userId
        const image = request.file

        const upload = await uploadImageCloudinary(image)

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })

        return response.json({
            message: "upload profile",
            data: {
                _id: userId,
                avatar: upload.url
            }
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// update user detail
export async function updateUserDetails(request, response) {
    try {
        const userId = request.userId
        const { name, email, mobile, password } = request.body

        let hashPassword = ""

        if (password) {
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password, salt)
        }

        const updateUser = await UserModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashPassword })
        })

        return response.json({
            message: "update user successfully",
            error: false,
            success: true,
            data: updateUser
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// forgot password
export async function forgotPasswordController(request, response) {
    try {
        const { email } = request.body

        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        const otp = generatedOtp()
        const expiretime = new Date() + 10 * 60 + 1000

        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            fogot_password_expiry: new Date(expiretime).toISOString()
        })

        await sendEmail({
            sendTo: email,
            subject: "Forgot password from NguyenPhucQuy",
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp
            })
        })

        return response.json({
            message: "chech your email",
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

// verify forgot password otp
export async function verifyForgotPasswordOpt(request, response) {
    try {
        const { email, otp } = request.body

        if (!email || !otp) {
            return response.status(400).json({
                message : "Provide required field email, otp",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if ( !user ) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        const currentTime = new Date().toISOString()

        if (user.fogot_password_expiry < currentTime) {
            return response.status(400).json({
                message : "Otp is expired",
                error : true,
                success : false
            })
        }

        if (otp !== user.forgot_password_otp) {
            return response.status(400).json({
                message : "Invalid otp",
                error : true,
                success : false
            })
        }

        return response.json({
            message : "Verify otp successfully",
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: error,
            success: false
        })
    }
} 

// reset password 
export async function resetpassword(request, response) {
    try {
        const { email, newPassword, confirmPassword } = request.body

        if (!email || !newPassword || !confirmPassword ) {
            return response.status(400).json({
                message : "Provide required fields email, newPassword, confirmPassword",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({email})

        if (!user) {
            return response.status(400).json({
                message : "Email is not available",
                error : true,
                success : false
            })
        }

        if (newPassword !== confirmPassword) {
            return response.status(400).json({
                message : "newPassword and confirmPassword not same.",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword, salt)

        const update = await UserModel.findOneAndUpdate(user._id, {
            password : hashPassword
        })

        return response.json({
            message : "Password updated successfully",
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// refresh token controller
export async function reftreshToken(request, response) {
    try {
        const refreshToken = request.cookies?.refreshToken || request.header?.authorization?.split(" ")[1];

        if(!refreshToken) {
            return response.status(401).json({
                message : "Invalid token",
                error : true,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken , process.env.SECRET_KEY_REFRESH_TOKEN)

        if (!verifyToken) {
            return response.status(401).json({
                message : "token is expired",
                error : true,
                success : false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generatedAccessToken(userId)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.cookie('accessToken', newAccessToken, cookiesOption)

        return response.json({
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}