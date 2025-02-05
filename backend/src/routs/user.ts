import { PrismaClient } from "@prisma/client"
import {z} from "zod"
import jwt from "jsonwebtoken"
const prisma = new PrismaClient();
import express, {Router, Response, Request} from "express";


const router:Router = Router();
router.use(express.json());
// **********************schemas *********************************

const signupSchema  = z.object({
    name:z.string(),
    email:z.string(),
    password:z.string()
})

const signinSchema = z.object({
    email:z.string(),
    password:z.string()
});

// ***************************************************************



router.post('/signup', async (req:Request, res:Response):Promise<any> =>{
    const result = signupSchema.safeParse(req.body);
    console.log("the body is " , req.body)

    if(!result.success){
        console.log(result.success)
        console.log(result.error)
        return res.status(403).json({message:"Wrong inputs from here", data:req.body});
    }

    const data = await prisma.user.findFirst({
        where:{email:req.body.email}
    })

    if(data){
       return res.status(403).json({message:"User already exists!"}); 
    }

    const data1 = await prisma.user.create({
        data:{
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
    })

    const token =  jwt.sign({userId:data1.id}, "somestring");

    res.json({message:"signedup successfully!", token:token});

});



router.post('/signin', async (req:Request, res:Response):Promise<any> =>{
    const result = signinSchema.safeParse(req.body);

    if(!result.success){
        return res.status(403).json({message:"Wrong inputs"});
    }

    try{
        const data = await prisma.user.findFirst({
            where:{email:req.body.email, password:req.body.password}
        })
    
        if(data){
            const token =  jwt.sign({userId:data.id}, "somestring");
            res.json({message:"signedup successfully!", token:token});
        }
        else{
            res.status(411).json({message:"User not found, please check Credentials!"});
        }
    }catch(e){
        res.status(403).json({message:"Something went wrong!"});
    }

});


export default router;