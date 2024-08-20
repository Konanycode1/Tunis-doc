"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const films_1 = __importDefault(require("../controller/films"));
const utilisateur_1 = __importDefault(require("../controller/utilisateur"));
const note_1 = __importDefault(require("../controller/note"));
const projection_1 = __importDefault(require("../controller/projection"));
const auth_1 = require("../middleware/auth");
const admin_1 = __importDefault(require("../controller/admin"));
const addProdAndReal_1 = __importDefault(require("../controller/addProdAndReal"));
const RouteAll = express_1.default.Router();
// admin
RouteAll.post("/admin/create", admin_1.default.create);
RouteAll.get("/admin/get", admin_1.default.get);
RouteAll.get('/admin/getAll', admin_1.default.getAll);
RouteAll.delete("admin/delete/:id", admin_1.default.delete);
RouteAll.put("admin/update/:id", admin_1.default.update);
// utilisateur
RouteAll.post("/user/login", utilisateur_1.default.login);
RouteAll.post("/user/create", auth_1.Authenticate, utilisateur_1.default.create);
RouteAll.get("/user/get/:id", auth_1.Authenticate, utilisateur_1.default.get);
RouteAll.get("/user/get/", auth_1.Authenticate, utilisateur_1.default.getAuth);
RouteAll.get('/user/getAll', utilisateur_1.default.getAll);
RouteAll.delete("user/delete/:id", auth_1.Authenticate, utilisateur_1.default.delete);
RouteAll.put("user/update/:id", auth_1.Authenticate, utilisateur_1.default.update);
// Realisateur et Producteur
RouteAll.post("/producteur/create", auth_1.Authenticate, addProdAndReal_1.default.createProd);
// RouteAll.get("/producteur/get",Authenticate, Add.get)
RouteAll.get('/producteur/getAll', addProdAndReal_1.default.getAllProd);
RouteAll.delete("producteur/delete/:id", auth_1.Authenticate, addProdAndReal_1.default.deleteProd);
// RouteAll.put("producteur/update/:id",Authenticate, Add.update)
RouteAll.post("/realisateur/create", auth_1.Authenticate, addProdAndReal_1.default.createReal);
// RouteAll.get("/realisateur/get",Authenticate, Add.get)
RouteAll.get('/realisateur/getAll', addProdAndReal_1.default.getAllReal);
RouteAll.delete("realisateur/delete/:id", auth_1.Authenticate, addProdAndReal_1.default.deleteReal);
// RouteAll.put("producteur/update/:id",Authenticate, Add.update)
// Films
RouteAll.post("/films/create", films_1.default.create);
RouteAll.get("/films/get", films_1.default.get);
RouteAll.get('/films/getAll', films_1.default.getAll);
RouteAll.delete("films/delete/:id", films_1.default.delete);
RouteAll.put("films/update/:id", films_1.default.update);
//Projection
RouteAll.post("/projection/create", projection_1.default.create);
RouteAll.get("/projection/get", projection_1.default.get);
RouteAll.get('/projection/getAll', projection_1.default.getAll);
RouteAll.delete("projection/delete/:id", projection_1.default.delete);
RouteAll.put("projection/update/:id", projection_1.default.update);
//note 
RouteAll.post("/note/create", note_1.default.create);
RouteAll.get("/note/get", note_1.default.get);
RouteAll.get('/note/getAll', note_1.default.getAll);
RouteAll.delete("note/delete/:id", note_1.default.delete);
RouteAll.put("note/update/:id", note_1.default.update);
exports.default = RouteAll;
//# sourceMappingURL=allRouter.js.map