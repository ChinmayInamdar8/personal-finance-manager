
import express, { Express , Router} from "express";
import userRouter from "./user"
import financeRouter from "./finance"
const router :Router= Router();





router.use('/user', userRouter);
router.use('/finance', financeRouter);




export default router;