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
const prisma = new client_1.PrismaClient();
const express_1 = __importStar(require("express"));
const auth_1 = __importDefault(require("../auth"));
const router = (0, express_1.Router)();
router.use(express_1.default.json());
// ***********************zod schemas ****************************************
const putSchema = zod_1.z.object({
    amount: zod_1.z.number(),
    type: zod_1.z.string(),
    category: zod_1.z.string()
});
// ***************************************************************************
router.get('/total', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.id) {
            const id = parseInt(req.id);
            const data = yield prisma.finance.findMany({
                where: {
                    user_id: id
                },
                select: {
                    type: true,
                    category: true,
                    amount: true
                }
            });
            const totals = {};
            data.forEach(({ type, category, amount }) => {
                if (!totals[type]) {
                    totals[type] = {};
                }
                if (!totals[type][category]) {
                    totals[type][category] = -0;
                }
                totals[type][category] += amount;
            });
            res.json({ totals });
        }
    }
    catch (e) {
        res.status(500);
    }
}));
// *******************************************************************************
router.get('/overview', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let income = 0;
    let expense = 0;
    let loan = 0;
    if (req.id) {
        const id = parseInt(req.id);
        const data = yield prisma.finance.findMany({
            where: {
                user_id: id
            },
            select: {
                type: true,
                category: true,
                amount: true
            }
        });
        data.forEach((element) => {
            if (element.type == "income") {
                income += element.amount;
            }
            else if (element.type == "expense") {
                expense += element.amount;
            }
            else {
                loan += element.amount;
            }
        });
        res.json({ income, expense, loan });
    }
}));
// *******************************************************************************
router.get('/history', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.id) {
            const id = parseInt(req.id);
            const data = yield prisma.finance.findMany({
                where: {
                    user_id: id
                },
                select: {
                    amount: true,
                    type: true,
                    category: true
                }
            });
            res.json({ data: data });
        }
    }
    catch (e) {
        res.status(500);
    }
}));
router.post('/income', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const check = putSchema.safeParse(req.body);
    console.log(req.body);
    if (!check.success) {
        console.log("******************", check.error);
        res.status(403).json({ message: "wrong inputs!" });
        return;
    }
    try {
        if (req.id) {
            yield prisma.finance.create({
                data: {
                    type: req.body.type,
                    category: req.body.category,
                    amount: req.body.amount,
                    user_id: parseInt(req.id)
                }
            });
            res.json({ message: "entry added successfully!" });
        }
    }
    catch (e) {
        res.status(500);
        return;
    }
}));
// **************************************************************************
router.post('/expense', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const check = putSchema.safeParse(req.body);
    if (!check.success) {
        res.status(403).json({ message: "wrong inputs!" });
        return;
    }
    try {
        if (req.id) {
            yield prisma.finance.create({
                data: {
                    type: req.body.type,
                    category: req.body.category,
                    amount: req.body.amount,
                    user_id: parseInt(req.id)
                }
            });
            res.json({ message: "entry added successfully!" });
        }
    }
    catch (e) {
        res.status(500);
        return;
    }
}));
// *************************************************************************
router.post('/loan', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const check = putSchema.safeParse(req.body);
    if (!check.success) {
        res.status(403).json({ message: "wrong inputs!" });
        return;
    }
    try {
        if (req.id) {
            yield prisma.finance.create({
                data: {
                    type: req.body.type,
                    category: req.body.category,
                    amount: req.body.amount,
                    user_id: parseInt(req.id)
                }
            });
            res.json({ message: "entry added successfully!" });
        }
    }
    catch (e) {
        res.status(500);
        return;
    }
}));
exports.default = router;
