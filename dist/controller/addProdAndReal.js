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
const Add = {
    createProd: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const undefinedValue = "" || " " || null || undefined;
            const user = req.user;
            const authUser = yield prisma_1.prisma.utilisateur.findFirst({
                where: {
                    id: user,
                    role: "RespoInspection" || "ADMIN"
                }
            });
            if (authUser === null) {
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }
            const { code, nom, prenom, dateNaissance } = req.body;
            if (code === undefinedValue) {
                res.json({
                    success: false,
                    message: "code producteur introuvable"
                });
                return;
            }
            if (nom === undefinedValue) {
                res.json({
                    success: false,
                    message: "nom producteur introuvable"
                });
                return;
            }
            if (prenom === undefinedValue) {
                res.json({
                    success: false,
                    message: "prenom producteur introuvable"
                });
                return;
            }
            if (dateNaissance === undefinedValue) {
                res.json({
                    success: false,
                    message: "date de Naissance producteur introuvable"
                });
                return;
            }
            yield prisma_1.prisma.production.create({
                data: {
                    code,
                    nom,
                    prenom,
                    dateNaissance,
                    inspectionId: authUser.id
                }
            });
            res.json({
                success: true,
                message: "Producteur ajouter avec succès"
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
    createReal: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const undefinedValue = "" || " " || null || undefined;
            const user = req.user;
            const authUser = yield prisma_1.prisma.utilisateur.findFirst({
                where: {
                    id: user,
                    role: "RespoInspection" || "ADMIN"
                }
            });
            if (authUser === null) {
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }
            const { code, nom, prenom, dateNaissance } = req.body;
            if (code === undefinedValue) {
                res.json({
                    success: false,
                    message: "code producteur introuvable"
                });
                return;
            }
            if (nom === undefinedValue) {
                res.json({
                    success: false,
                    message: "nom producteur introuvable"
                });
                return;
            }
            if (prenom === undefinedValue) {
                res.json({
                    success: false,
                    message: "prenom producteur introuvable"
                });
                return;
            }
            if (dateNaissance === undefinedValue) {
                res.json({
                    success: false,
                    message: "date de Naissance producteur introuvable"
                });
                return;
            }
            yield prisma_1.prisma.realisateur.create({
                data: {
                    code,
                    nom,
                    prenom,
                    dateNaissance,
                    inspectionId: authUser.id
                }
            });
            res.json({
                success: true,
                message: "Réalisateur ajouter avec succès"
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
    deleteProd: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = req.user;
            const authUser = yield prisma_1.prisma.utilisateur.findFirst({
                where: {
                    id: user,
                    role: "RespoInspection" || "ADMIN"
                }
            });
            if (authUser === null) {
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }
            const verifyId = yield prisma_1.prisma.production.findUnique({
                where: {
                    id
                }
            });
            if (verifyId === null) {
                res.json({
                    success: false,
                    message: "Producteur introuvable !!"
                });
                return;
            }
            yield prisma_1.prisma.production.delete({
                where: {
                    id: verifyId.id
                }
            });
            res.json({
                success: true,
                message: 'Producteur supprimé'
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
    deleteReal: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = req.user;
            const authUser = yield prisma_1.prisma.utilisateur.findFirst({
                where: {
                    id: user,
                    role: "RespoInspection" || "ADMIN"
                }
            });
            if (authUser === null) {
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }
            const verifyId = yield prisma_1.prisma.realisateur.findUnique({
                where: {
                    id
                }
            });
            if (verifyId === null) {
                res.json({
                    success: false,
                    message: "Producteur introuvable !!"
                });
                return;
            }
            yield prisma_1.prisma.realisateur.delete({
                where: {
                    id: verifyId.id
                }
            });
            res.json({
                success: true,
                message: 'Réalisateur supprimé'
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
    getAllProd: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ProducteurAll = yield prisma_1.prisma.production.findMany({
                include: {
                    utilisateur: true
                }
            });
            res.json({
                success: true,
                producteur: ProducteurAll
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
    getAllReal: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const realisateurAll = yield prisma_1.prisma.realisateur.findMany({
                include: {
                    utilisateur: true
                }
            });
            res.json({
                success: true,
                realisateur: realisateurAll
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
exports.default = Add;
//# sourceMappingURL=addProdAndReal.js.map