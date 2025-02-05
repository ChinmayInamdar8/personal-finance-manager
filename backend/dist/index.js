"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routs/index"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173"
}));
app.use("/api", index_1.default);
const port = 3000;
app.listen(port, () => {
    console.log("http://localhost:3000");
});
