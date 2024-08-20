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
exports.verifyUserCode = exports.verifyUserEmail = void 0;
const prisma_1 = require("./prisma");
const verifyUserEmail = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verify = yield prisma_1.prisma.utilisateur.findFirst({
            where: {
                code
            }
        });
        return verify;
    }
    catch (error) {
        console.error("Error verifying user email:", error);
        return null;
    }
});
exports.verifyUserEmail = verifyUserEmail;
const verifyUserCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verify = yield prisma_1.prisma.utilisateur.findFirst({
            where: {
                code
            }
        });
        return verify;
    }
    catch (error) {
        console.error("Error verifying user email:", error);
        return null;
    }
});
exports.verifyUserCode = verifyUserCode;
//# sourceMappingURL=verify.js.map