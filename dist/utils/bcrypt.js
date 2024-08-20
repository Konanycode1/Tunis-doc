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
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield (0, bcrypt_1.genSalt)(10);
        return yield (0, bcrypt_1.hash)(password, salt);
    }
    catch (e) {
        if (typeof e === "string") {
            console.log(e.toUpperCase()); // fonctionne, `e` est réduit à une chaîne de caractères
        }
        else if (e instanceof Error) {
            console.log(e.message); // fonctionne, `e` est réduit à une instance de Error
        }
        throw e; // renvoie l'erreur après l'avoir traitée
    }
});
exports.hashPassword = hashPassword;
const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, bcrypt_1.compare)(password, hashedPassword);
    }
    catch (e) {
        if (typeof e === "string") {
            console.log(e.toUpperCase()); // fonctionne, `e` est réduit à une chaîne de caractères
        }
        else if (e instanceof Error) {
            console.log(e.message); // fonctionne, `e` est réduit à une instance de Error
        }
        return false; // retourne false en cas d'erreur lors de la comparaison
    }
});
exports.comparePassword = comparePassword;
//# sourceMappingURL=bcrypt.js.map