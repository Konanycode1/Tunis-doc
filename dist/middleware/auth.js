"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.Authenticate = void 0;
const token_1 = require("../utils/token");
const prisma_1 = require("../utils/prisma");
const Authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const secretKey = process.env.TOKEN_SECRET || 'key work API';
    const authHearder = req.headers["Authorization"];
    console.log("Authhearder: ", authHearder);
    if (authHearder) {
        const token = authHearder.split(' ')[1];
        console.log('token01: ', token);
        const result = yield (0, token_1.verifyToken)(token);
        try {
            if (result) {
                req.user = result.id;
                next();
            }
            else {
                res.
                    status(404)
                    .json({
                    success: false,
                    message: 'token is not exist, Please connect you again'
                });
                return;
            }
        }
        catch (error) {
            res.
                status(404)
                .json({
                success: false,
                message: 'an error has occured'
            });
            return;
        }
    }
    else {
        res.
            status(404)
            .json({
            success: false,
            message: 'You token is undefined'
        });
        return;
    }
});
exports.Authenticate = Authenticate;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const user = yield prisma_1.prisma.utilisateur.findUnique({ where: { id: userId } });
    if (user) {
        next();
    }
    else {
        res.status(403).json({ success: false, message: 'Forbidden: Admins only' });
    }
});
exports.isAdmin = isAdmin;
//# sourceMappingURL=auth.js.map