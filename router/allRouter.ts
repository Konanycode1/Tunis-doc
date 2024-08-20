import express from 'express'
import Film from "../controller/films"
import Utilisateurs from "../controller/utilisateur"
import Note from "../controller/note"
import Projections from '../controller/projection'
import { Authenticate } from '../middleware/auth'
import Admins from '../controller/admin'
import Add from '../controller/addProdAndReal'

const RouteAll = express.Router()
// admin
RouteAll.post("/admin/create", Admins.create)
RouteAll.get("/admin/get", Admins.get)
RouteAll.get('/admin/getAll', Admins.getAll)
RouteAll.delete("admin/delete/:id", Admins.delete)
RouteAll.put("admin/update/:id", Admins.update)

// utilisateur
RouteAll.post("/user/login", Utilisateurs.login)
RouteAll.post("/user/create",Authenticate, Utilisateurs.create)
RouteAll.get("/user/get/:id",Authenticate, Utilisateurs.get)
RouteAll.get("/user/get/",Authenticate, Utilisateurs.getAuth)
RouteAll.get('/user/getAll', Utilisateurs.getAll)
RouteAll.delete("user/delete/:id",Authenticate, Utilisateurs.delete)
RouteAll.put("user/update/:id",Authenticate, Utilisateurs.update)
// Realisateur et Producteur
RouteAll.post("/producteur/create",Authenticate, Add.createProd)
// RouteAll.get("/producteur/get",Authenticate, Add.get)
RouteAll.get('/producteur/getAll', Add.getAllProd)
RouteAll.delete("producteur/delete/:id",Authenticate, Add.deleteProd)
// RouteAll.put("producteur/update/:id",Authenticate, Add.update)

RouteAll.post("/realisateur/create",Authenticate, Add.createReal)
// RouteAll.get("/realisateur/get",Authenticate, Add.get)
RouteAll.get('/realisateur/getAll', Add.getAllReal)
RouteAll.delete("realisateur/delete/:id",Authenticate, Add.deleteReal)
// RouteAll.put("producteur/update/:id",Authenticate, Add.update)
// Films
RouteAll.post("/films/create",Authenticate, Film.create)
RouteAll.get("/films/get", Film.get)
RouteAll.get('/films/getAll', Film.getAll)
RouteAll.delete("films/delete/:id", Film.delete)
RouteAll.put("films/update/:id", Film.update)

//Projection
RouteAll.post("/projection/create", Authenticate, Projections.create)
RouteAll.get("/projection/get", Projections.get)
RouteAll.get('/projection/getAll', Projections.getAll)
RouteAll.delete("projection/delete/:id", Projections.delete)
RouteAll.put("projection/update/:id", Projections.update)

//note 
RouteAll.post("/note/create",Authenticate, Note.create)
RouteAll.get("/note/get", Note.get)
RouteAll.get('/note/getAll', Note.getAll)
RouteAll.delete("note/delete/:id", Note.delete)
RouteAll.put("note/update/:id", Note.update)

export default RouteAll