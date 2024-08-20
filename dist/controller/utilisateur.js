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
const verify_1 = require("../utils/verify");
const bcrypt_1 = require("../utils/bcrypt");
const token_1 = require("../utils/token");
const Utilisateurs = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const undefinedValue = "" || " " || null || undefined;
            const user = req.user;
            const authUser = yield prisma_1.prisma.admin.findFirst({
                where: {
                    id: user
                }
            });
            if (!authUser) {
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }
            const { code, nom, prenom, dateNaissance, role, password } = req.body;
            if (code === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "code is not exist, please enter your code"
                });
                return;
            }
            if (nom === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "nom is not exist, please enter your nom"
                });
                return;
            }
            if (prenom === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "prenom is not exist, please enter your prenom"
                });
                return;
            }
            if (dateNaissance === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "dateNaissance is not exist, please enter your dateNaissance"
                });
                return;
            }
            if (password === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "password is not exist, please enter your password"
                });
                return;
            }
            if (role === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "role is not exist, please enter your role"
                });
                return;
            }
            if (role === "ADMIN" && authUser.role !== "ADMIN") {
                res.json({
                    sucess: false,
                    message: "Vous n'est pas autorisé à effectué cet ajout"
                });
                return;
            }
            const createUser = yield prisma_1.prisma.utilisateur.create({
                data: {
                    code,
                    nom,
                    prenom,
                    dateNaissance,
                    role,
                    idAdmin: authUser.id,
                    password: yield (0, bcrypt_1.hashPassword)(password)
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
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { code, password } = req.body;
            if (!code) {
                res.json({
                    success: false,
                    message: "code are not exist !!, please enter your code number"
                });
                return;
            }
            if (code === "superAdmin" && password === "superAdmin") {
                const admin = (yield prisma_1.prisma.admin.findFirst({
                    where: {
                        user: code,
                        password
                    }
                })) || null;
                if (admin === null) {
                    res.json({
                        success: false,
                        message: "admin are not exist !!"
                    });
                    return;
                }
                const token = (0, token_1.generateToken)({ id: admin.id });
                res.json({
                    success: true,
                    message: "Connexion successful",
                    token: token
                });
            }
            else {
                const userCode = yield (0, verify_1.verifyUserCode)(code);
                if (userCode === null) {
                    res.json({
                        success: false,
                        message: "Phone are not exist !!"
                    });
                    return;
                }
                const veryPassword = yield (0, bcrypt_1.comparePassword)(password, userCode.password);
                if (!veryPassword) {
                    res.json({
                        success: false,
                        message: "Verify your password enter"
                    });
                    return;
                }
                const token = yield (0, token_1.generateToken)({ id: userCode.id });
                res.json({
                    success: true,
                    message: "Connexion successful",
                    token: token
                });
            }
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
            const user = req.user;
            const authUser = yield prisma_1.prisma.utilisateur.findFirst({
                where: {
                    id: user,
                    role: "ADMIN"
                }
            });
            if (authUser === null) {
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }
            const userGet = yield prisma_1.prisma.utilisateur.findUnique({
                where: {
                    id
                }
            });
            if (userGet == null) {
                res.json({
                    success: false,
                    message: "Utilisateur introuvable dans notre base"
                });
                return;
            }
            yield prisma_1.prisma.utilisateur.delete({
                where: {
                    id: userGet.id
                }
            });
            res.json({
                success: true,
                message: "Utilisateur supprimé dans notre base"
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
            const user = req.user;
            const authUser = yield prisma_1.prisma.utilisateur.findFirst({
                where: {
                    id: user
                }
            });
            if (!authUser) {
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }
            const userGet = yield prisma_1.prisma.utilisateur.findUnique({
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
                utilisateur: userGet
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
    getAuth: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.user;
            const authUser = yield prisma_1.prisma.utilisateur.findFirst({
                where: {
                    id: user
                }
            });
            if (!authUser) {
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }
            const userGet = yield prisma_1.prisma.utilisateur.findUnique({
                where: {
                    id: authUser.id
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
                utilisateur: userGet
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
            const allUser = yield prisma_1.prisma.utilisateur.findMany({});
            res.json({
                success: false,
                utilisateurs: allUser
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
exports.default = Utilisateurs;
//# sourceMappingURL=utilisateur.js.map