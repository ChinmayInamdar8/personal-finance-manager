import { PrismaClient } from "@prisma/client"
import {record, z} from "zod"
import jwt from "jsonwebtoken"
const prisma = new PrismaClient();
import express, { Express , Router, Response, Request} from "express";
import AuthMiddleware from "../auth";

const router:Router = Router();
router.use(express.json());

// ***********************zod schemas ****************************************


const putSchema = z.object({
    amount:z.number(),
    type:z.string(),
    category:z.string()
})

// ***************************************************************************




router.get('/total', AuthMiddleware, async (req:Request,res:Response)=>{
    try{
        if(req.id){
            const id = parseInt(req.id);
            const data = await prisma.finance.findMany({
                where:{
                    user_id:id
                },
                select:{
                    type:true,
                    category:true,
                    amount:true
                }
            });

            const totals : Record<string, Record<string, number>> = {};

            data.forEach(({type, category, amount})=>{
                if(!totals[type]){
                    totals[type] = {};
                }
                if(!totals[type][category]){
                    totals[type][category] = -0;
                }

                totals[type][category] +=amount;
            })
            res.json({totals});

        }
        
    }catch(e){
        res.status(500);
    }
});


// *******************************************************************************

router.get('/overview', AuthMiddleware, async (req:Request, res:Response)=>{
    let income:number = 0;
    let expense:number = 0;
    let loan:number = 0;

    if(req.id){
        const id = parseInt(req.id);
            const data = await prisma.finance.findMany({
                where:{
                    user_id:id
                },
                select:{
                    type:true,
                    category:true,
                    amount:true
                }
            });

            data.forEach((element)=>{
                if(element.type=="income"){
                    income +=element.amount;
                }else if(element.type=="expense"){
                    expense +=element.amount;
                }
                else{
                    loan +=element.amount;

                }
            })

            res.json({income, expense, loan});
    }

})



// *******************************************************************************

router.get('/history', AuthMiddleware, async(req:Request, res:Response)=>{
    try{
        if(req.id){
            const id = parseInt(req.id);

            const data = await prisma.finance.findMany({
                where:{
                    user_id:id
                },
                select:{
                    amount:true,
                    type:true,
                    category:true
                }
            })

            res.json({data:data});
        }
    }catch(e){
        res.status(500);
    }
})


router.post('/income', AuthMiddleware, async(req:Request, res:Response)=>{
    const check = putSchema.safeParse(req.body);
    console.log(req.body);
    if(!check.success){
        console.log("******************", check.error)
        res.status(403).json({message:"wrong inputs!"});
        return;
    }

    try{
        if(req.id){
            await prisma.finance.create({
                data:{
                    type:req.body.type,
                    category:req.body.category,
                    amount:req.body.amount,
                    user_id:parseInt(req.id)
                }
            })

            res.json({message:"entry added successfully!"});

        }
        
    }catch(e){
        res.status(500);
        return;
    }

});

// **************************************************************************

router.post('/expense', AuthMiddleware, async(req:Request, res:Response)=>{
    const check = putSchema.safeParse(req.body);
    if(!check.success){
        res.status(403).json({message:"wrong inputs!"});
        return;
    }

    try{
        if(req.id){
            await prisma.finance.create({
                data:{
                    type:req.body.type,
                    category:req.body.category,
                    amount:req.body.amount,
                    user_id:parseInt(req.id)
                }
            })

            res.json({message:"entry added successfully!"});

        }
        
    }catch(e){
        res.status(500);
        return;
    }

});

// *************************************************************************

router.post('/loan', AuthMiddleware, async(req:Request, res:Response)=>{
    const check = putSchema.safeParse(req.body);
    if(!check.success){
        res.status(403).json({message:"wrong inputs!"});
        return;
    }

    try{
        if(req.id){
            await prisma.finance.create({
                data:{
                    type:req.body.type,
                    category:req.body.category,
                    amount:req.body.amount,
                    user_id:parseInt(req.id)
                }
            })

            res.json({message:"entry added successfully!"});

        }
        
    }catch(e){
        res.status(500);
        return;
    }

});



export default router;