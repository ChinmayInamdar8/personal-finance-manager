import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

// Extend the Request interface to include `id`
declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}



export default function AuthMiddleware(req: Request, res: Response, next: NextFunction):void{
    const head = req.headers.authorization;

    if (head) {
        const token = head.split(" ");
        if (token[0].toLowerCase() === "bearer" && token[1]) {
            try {
                const data: any = jwt.verify(token[1], "somestring");
                req.id = data.userId;
                return next(); // Proceed to the next middleware or route handler
            } catch (e) {
                res.status(411).json({ message: "Bad request" });
                return;
            }
        } else {
            res.status(411).json({ message: "Bad request" });
            return;
        }
    } else {
        res.status(411).json({ message: "Bad request" });
        return;
    }
}
