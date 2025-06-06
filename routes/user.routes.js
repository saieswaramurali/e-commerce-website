import { Router } from "express";
import { getAllUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const userRouter = Router() ; 

userRouter.get('/', getAllUsers) ; 

userRouter.get('/:id', getUser) ; 

userRouter.put('/:id', updateUser) ; 

userRouter.delete('/:id', deleteUser) ; 

export default userRouter ; 