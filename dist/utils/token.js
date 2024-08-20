"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({ path: path_1.default.resolve(process.cwd(), "../.env") });
const generateToken = (payload) => {
    try {
        const secret = process.env.TOKEN_SECRET;
        return jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: "1d"
        });
    }
    catch (e) {
        if (typeof e === "string") {
            console.log(e.toUpperCase()); // works, `e` narrowed to string
        }
        else if (e instanceof Error) {
            console.log(e.message); // works, `e` narrowed to Error
        }
    }
};
exports.generateToken = generateToken;
const verifyToken = (tokenValue) => {
    try {
        const secret = process.env.TOKEN_SECRET;
        return jsonwebtoken_1.default.verify(tokenValue, secret);
    }
    catch (e) {
        if (typeof e === "string") {
            console.log(e.toUpperCase()); // works, `e` narrowed to string
        }
        else if (e instanceof Error) {
            console.log(e.message); // works, `e` narrowed to Error
        }
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token.js.map