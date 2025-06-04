import { Router } from "express";
import { createUser, getAllUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const userRouter = Router() ; 

userRouter.post('/', createUser) ; 

userRouter.get('/', getAllUsers) ; 

userRouter.get('/:id', getUser) ; 

userRouter.put('/:id', updateUser) ; 

userRouter.delete('/:id', deleteUser) ; 

export default userRouter ; 