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
const Film = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const undefinedValue = "" || " " || null || undefined;
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
            const { code, titre, dateCreate, sujet, productionId, realisateurId } = req.body;
            if (code === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "code is not exist, please enter your code"
                });
                return;
            }
            if (titre === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "titre is not exist, please enter your titre"
                });
                return;
            }
            if (dateCreate === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "dtaCreate is not exist, please enter your dtaCreate"
                });
                return;
            }
            if (sujet === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "sujet is not exist, please enter your sujet"
                });
                return;
            }
            if (productionId === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "réalisateur is not exist, please enter your réalisateur"
                });
                return;
            }
            if (realisateurId === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "Producteur is not exist, please enter your Producteur"
                });
                return;
            }
            // Création de l'entrée Films avec les relations
            const newFilm = yield prisma_1.prisma.films.create({
                data: {
                    code,
                    titre,
                    dateCreate: new Date(dateCreate),
                    sujet,
                    reponsableId: authUser.id,
                    productionId,
                    realisateurId
                },
            });
            if (!newFilm) {
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
            const user = req.user;
            const authUser = yield prisma_1.prisma.utilisateur.findFirst({
                where: {
                    id: user,
                }
            });
            if (authUser === null) {
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }
            const userGet = yield prisma_1.prisma.films.findUnique({
                where: {
                    id
                }
            });
            if (userGet == null) {
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            yield prisma_1.prisma.films.delete({
                where: {
                    id: userGet.id
                }
            });
            res.json({
                success: true,
                message: "Films supprimé dans notre base"
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
            const filmGet = yield prisma_1.prisma.films.findUnique({
                where: {
                    id
                }
            });
            if (!filmGet) {
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            res.json({
                success: true,
                Films: filmGet
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
            const allUsers = yield prisma_1.prisma.films.findMany({
                include: {
                    utilisateur: true,
                    production: true,
                    realisateur: true
                }
            });
            res.json({
                success: false,
                Filmss: allUsers
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
exports.default = Film;
//# sourceMappingURL=films.js.map