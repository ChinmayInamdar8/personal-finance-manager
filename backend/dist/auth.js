"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthMiddleware;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
function AuthMiddleware(req, res, next) {
    const head = req.headers.authorization;
    if (head) {
        const token = head.split(" ");
        if (token[0].toLowerCase() === "bearer" && token[1]) {
            try {
                const data = jsonwebtoken_1.default.verify(token[1], "somestring");
                req.id = data.userId;
                return next(); // Proceed to the next middleware or route handler
            }
            catch (e) {
                res.status(411).json({ message: "Bad request" });
                return;
            }
        }
        else {
            res.status(411).json({ message: "Bad request" });
            return;
        }
    }
    else {
        res.status(411).json({ message: "Bad request" });
        return;
    }
}
