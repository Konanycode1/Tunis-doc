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
const Notes = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const filmsId = req.query.filmsId;
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
            const { note } = req.body;
            if (note === undefinedValue) {
                res.json({
                    sucess: false,
                    message: "la note is not exist, please enter your la note"
                });
                return;
            }
            const filmGet = yield prisma_1.prisma.films.findFirst({
                where: {
                    id: filmsId
                }
            });
            if (!filmGet) {
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            const createUser = yield prisma_1.prisma.note.create({
                data: {
                    note,
                    idJury: authUser.id,
                    filmsId: filmsId
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
            const noteGet = yield prisma_1.prisma.note.findUnique({
                where: {
                    id
                }
            });
            if (noteGet == null) {
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            yield prisma_1.prisma.projection.delete({
                where: {
                    id: noteGet.id
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
            const noteGet = yield prisma_1.prisma.projection.findUnique({
                where: {
                    id
                }
            });
            if (!noteGet) {
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            res.json({
                success: true,
                Films: noteGet
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
            const allNote = yield prisma_1.prisma.note.findMany({});
            res.json({
                success: false,
                Filmss: allNote
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
exports.default = Notes;
//# sourceMappingURL=note.js.map