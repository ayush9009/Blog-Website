//ye file login and regsiter kai liye user kai
import  express  from "express";
import { login, logout, regsiter } from "../controllers/auth.js";


const router=express.Router()

//post method is used when we want to send the data to server .
router.post("/register",regsiter);
router.post("/login",login);
router.post("/logout",logout);




export default router