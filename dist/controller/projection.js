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
const Projections = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const undefinedValue = "" || " " || null || undefined;
            const user = req.user;
            const authUser = yield prisma_1.prisma.utilisateur.findFirst({
                where: {
                    id: user,
                    role: "RespoProduction"
                }
            });
            if (!authUser) {
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }
            const { jour, date, lieu, salle, filmsId } = req.body;
            if (jour === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "jour is not exist, please enter your jour"
                });
                return;
            }
            if (date === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "date is not exist, please enter your date"
                });
                return;
            }
            if (lieu === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "dtaCreate is not exist, please enter your dtaCreate"
                });
                return;
            }
            if (salle === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "la salle is not exist, please enter your la salle"
                });
                return;
            }
            const filmGet = yield prisma_1.prisma.films.findUnique({
                where: { id: filmsId }
            });
            if (!filmGet) {
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            const createUser = yield prisma_1.prisma.projection.create({
                data: {
                    jour,
                    date,
                    lieu,
                    salle,
                    idResProd: authUser.id,
                    filmsId
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
            const projectGet = yield prisma_1.prisma.projection.findUnique({
                where: {
                    id
                }
            });
            if (projectGet == null) {
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            yield prisma_1.prisma.projection.delete({
                where: {
                    id: projectGet.id
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
            const projectGet = yield prisma_1.prisma.projection.findUnique({
                where: {
                    id
                }
            });
            if (!projectGet) {
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            res.json({
                success: true,
                Films: projectGet
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
            const allProjection = yield prisma_1.prisma.projection.findMany({
                include: {
                    films: true,
                    Responsable: true
                }
            });
            res.json({
                success: true,
                projection: allProjection
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
exports.default = Projections;
//# sourceMappingURL=projection.js.map