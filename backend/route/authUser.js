import express from "express"
import { userRegister } from "../routeControllers/userrouteController.js"

const router = express.Router()

router.post('/register',userRegister)

export default router
