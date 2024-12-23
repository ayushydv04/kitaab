import express from 'express'
// , , verifyRazorpay, placeOrderRazorpay
import {placeOrder, allOrders, userOrders, updateStatus, placeOrderStripe, verifyStripe  } from '../controllers/orderController.js'
import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
// orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// User Feature 
orderRouter.post('/userorders',authUser,userOrders)

// verify payment
orderRouter.post('/verifySrtipe',authUser, verifyStripe)
// orderRouter.post('/verifyRazorpay',authUser, verifyRazorpay)

export default orderRouter