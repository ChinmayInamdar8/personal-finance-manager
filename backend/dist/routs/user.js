"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const express_1 = __importStar(require("express"));
const router = (0, express_1.Router)();
router.use(express_1.default.json());
// **********************schemas *********************************
const signupSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
const signinSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
// ***************************************************************
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = signupSchema.safeParse(req.body);
    console.log("the body is ", req.body);
    if (!result.success) {
        console.log(result.success);
        console.log(result.error);
        return res.status(403).json({ message: "Wrong inputs from here", data: req.body });
    }
    const data = yield prisma.user.findFirst({
        where: { email: req.body.email }
    });
    if (data) {
        return res.status(403).json({ message: "User already exists!" });
    }
    const data1 = yield prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    });
    const token = jsonwebtoken_1.default.sign({ userId: data1.id }, "somestring");
    res.json({ message: "signedup successfully!", token: token });
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = signinSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(403).json({ message: "Wrong inputs" });
    }
    try {
        const data = yield prisma.user.findFirst({
            where: { email: req.body.email, password: req.body.password }
        });
        if (data) {
            const token = jsonwebtoken_1.default.sign({ userId: data.id }, "somestring");
            res.json({ message: "signedup successfully!", token: token });
        }
        else {
            res.status(411).json({ message: "User not found, please check Credentials!" });
        }
    }
    catch (e) {
        res.status(403).json({ message: "Something went wrong!" });
    }
}));
exports.default = router;
