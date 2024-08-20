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
const prisma_1 = require("../utils/prisma");
const Admins = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const undefinedValue = "" || " " || null || undefined;
            const { user, password } = req.body;
            const createUser = yield prisma_1.prisma.admin.create({
                data: {
                    user,
                    password
                }
            });
            if (!createUser) {
                res.json({
                    success: false,
                    message: "Erreur d'insertion !!"
                });
                return;
            }
            res.json({
                success: true,
                message: "Insertion effectuée avec succès !!"
            });
        }
        catch (e) {
            if (typeof e === "string") {
                console.log(e.toUpperCase());
            }
            else if (e instanceof Error) {
                res.
                    status(404)
                    .json({
                    success: false,
                    message: 'an error has occured',
                    data: e.message
                });
                return; // works, `e` narrowed to Error
            }
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const userGet = yield prisma_1.prisma.admin.findUnique({
                where: {
                    id
                }
            });
            if (userGet == null) {
                res.json({
                    success: false,
                    message: "admin introuvable dans notre base"
                });
                return;
            }
            yield prisma_1.prisma.admin.delete({
                where: {
                    id: userGet.id
                }
            });
            res.json({
                success: true,
                message: "admin supprimé dans notre base"
            });
        }
        catch (e) {
            if (typeof e === "string") {
                console.log(e.toUpperCase());
            }
            else if (e instanceof Error) {
                res.
                    status(404)
                    .json({
                    success: false,
                    message: 'an error has occured',
                    data: e.message
                });
                return; // works, `e` narrowed to Error
            }
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
        }
        catch (e) {
            if (typeof e === "string") {
                console.log(e.toUpperCase());
            }
            else if (e instanceof Error) {
                res.
                    status(404)
                    .json({
                    success: false,
                    message: 'an error has occured',
                    data: e.message
                });
                return; // works, `e` narrowed to Error
            }
        }
    }),
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const userGet = yield prisma_1.prisma.admin.findUnique({
                where: {
                    id
                }
            });
            if (!userGet) {
                res.json({
                    success: false,
                    message: "Utilisateur introuvable dans notre base"
                });
                return;
            }
            res.json({
                success: true,
                admin: userGet
            });
        }
        catch (e) {
            if (typeof e === "string") {
                console.log(e.toUpperCase());
            }
            else if (e instanceof Error) {
                res.
                    status(404)
                    .json({
                    success: false,
                    message: 'an error has occured',
                    data: e.message
                });
                return; // works, `e` narrowed to Error
            }
        }
    }),
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUser = yield prisma_1.prisma.admin.findMany({});
            res.json({
                success: false,
                Admins: allUser
            });
        }
        catch (e) {
            if (typeof e === "string") {
                console.log(e.toUpperCase());
            }
            else if (e instanceof Error) {
                res.
                    status(404)
                    .json({
                    success: false,
                    message: 'an error has occured',
                    data: e.message
                });
                return; // works, `e` narrowed to Error
            }
        }
    })
};
exports.default = Admins;
//# sourceMappingURL=admin.js.map