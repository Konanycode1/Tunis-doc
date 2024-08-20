import { isAdmin } from './../middleware/auth';
import { Request, Response } from 'express';
import { Auth, Utilisateur } from './../interface';
import { prisma } from "../utils/prisma";
import { verifyUserCode } from '../utils/verify';
import { comparePassword, hashPassword } from '../utils/bcrypt';
import { generateToken } from '../utils/token';


const Utilisateurs = {
    create :  async (req:Request ,res:Response)=>{
        try {
            const undefinedValue = "" || " " || null || undefined;
            const user = ( req as unknown as Auth).user
            const authUser = await prisma.admin.findFirst({
                where:{
                    id:user
                }
            });
            if(!authUser){
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }
            const {code, nom,prenom,dateNaissance,role, password} = req.body
            if(code === undefinedValue){
                res.json({
                    sucess:false,
                    message:"code is not exist, please enter your code"
                })
                return
            }
            if(nom === undefinedValue){
                res.json({
                    sucess:false,
                    message:"nom is not exist, please enter your nom"
                })
                return
            }
            if(prenom === undefinedValue){
                res.json({
                    sucess:false,
                    message:"prenom is not exist, please enter your prenom"
                })
                return
            }
            if(dateNaissance === undefinedValue){
                res.json({
                    sucess:false,
                    message:"dateNaissance is not exist, please enter your dateNaissance"
                })
                return
            }
            if(password === undefinedValue){
                res.json({
                    sucess:false,
                    message:"password is not exist, please enter your password"
                })
                return
            } 
            if(role === undefinedValue){
                res.json({
                    sucess:false,
                    message:"role is not exist, please enter your role"
                })
                return
            } 
            if( role === "ADMIN" && authUser.role !== "ADMIN"){
                res.json({
                    sucess:false,
                    message:"Vous n'est pas autorisé à effectué cet ajout"
                })
                return
            }

            const createUser = await prisma.utilisateur.create({
                data:{
                    code,
                    nom,
                    prenom,
                    dateNaissance,
                    role,
                    idAdmin:authUser.id,
                    password: await hashPassword(password)
                }
            })

            if(!createUser){
                res.json({
                    success:false,
                    message: "Erreur d'insertion !!"
                })
                return
            }

            res.json({
                success: true,
                message: "Insertion effectuée avec succès !!"
            })
 
        } catch (e) {
            if (typeof e === "string") {
                console.log( e.toUpperCase()) 
            } 
            else if (e instanceof Error) {
                res.
                status(404)
                .json({
                    success: false,
                    message: 'an error has occured',
                    data:e.message
                })  
                return; // works, `e` narrowed to Error
            }
        }

    },
    login: async (req:Request,res:Response)=>{
        try {
            const {code,password} = req.body;
            
            if(!code){
                res.json({
                    success: false,
                    message: "code are not exist !!, please enter your code number"
                });
                return;
            }
            if(code === "superAdmin" && password === "superAdmin"){
                const admin = await prisma.admin.findFirst({
                    where:{
                        user:code,
                        password
                    }
                }) || null
                if(admin === null){
                    res.json({
                        success: false,
                        message: "admin are not exist !!"
                    });
                    return;
                }
                const token =  generateToken({id:admin.id});
                res.json({
                    success:true,
                    message:"Connexion successful",
                    token:token
                });
            }
            else{
                const userCode = await verifyUserCode(code);
                if(userCode === null){
                    res.json({
                        success: false,
                        message: "Phone are not exist !!"
                    });
                    return;
                }
                const veryPassword = await comparePassword(password, userCode.password);
                if(!veryPassword){
                    res.json({
                        success: false,
                        message: "Verify your password enter"
                    });
                    return;
                }
    
                const token = await generateToken({id:userCode.id});
                res.json({
                    success:true,
                    message:"Connexion successful",
                    token:token
                });
            }
           

        } catch (e) {
            if (typeof e === "string") {
                console.log( e.toUpperCase()) 
             } else if (e instanceof Error) {
                res.
                status(404)
                .json({
                    success: false,
                    message: 'an error has occured',
                    data:e.message
                })
                return; // works, `e` narrowed to Error
             }
        }
    },
    delete :  async (req:Request ,res:Response)=>{
        try {
            const {id} = req.params
            const user = ( req as unknown as Auth).user
            const authUser: Utilisateur | null = await prisma.utilisateur.findFirst({
                where:{
                    id:user,
                    role: "ADMIN"
                }
            });
            if(authUser === null){
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }  
            const userGet: Utilisateur | null = await prisma.utilisateur.findUnique({
                where:{
                    id
                }
            })
            if(userGet == null){
                res.json({
                    success: false,
                    message: "Utilisateur introuvable dans notre base"
                });
                return;
            }
            await prisma.utilisateur.delete({
                where:{
                    id:userGet.id
                }
            })
            res.json({
                success: true,
                message: "Utilisateur supprimé dans notre base"
            });


        } catch (e) {
            if (typeof e === "string") {
                console.log( e.toUpperCase()) 
            } 
            else if (e instanceof Error) {
                res.
                status(404)
                .json({
                    success: false,
                    message: 'an error has occured',
                    data:e.message
                })  
                return; // works, `e` narrowed to Error
            }
        }

    },
    update :  async (req:Request ,res:Response)=>{
        try {
            
        } catch (e) {
            if (typeof e === "string") {
                console.log( e.toUpperCase()) 
            } 
            else if (e instanceof Error) {
                res.
                status(404)
                .json({
                    success: false,
                    message: 'an error has occured',
                    data:e.message
                })  
                return; // works, `e` narrowed to Error
            }
        }

    },
    get :  async (req:Request ,res:Response)=>{
        try {
            const {id} = req.params
            const user = ( req as unknown as Auth).user
            const authUser: Utilisateur | null = await prisma.utilisateur.findFirst({
                where:{
                    id:user
                }
            });
            if(!authUser){
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }  
            const userGet = await prisma.utilisateur.findUnique({
                where:{
                    id
                }
            })
            if(!userGet){
                res.json({
                    success: false,
                    message: "Utilisateur introuvable dans notre base"
                });
                return;
            }
            res.json({
                success: true,
                utilisateur : userGet
            });   
        } catch (e) {
            if (typeof e === "string") {
                console.log( e.toUpperCase()) 
            } 
            else if (e instanceof Error) {
                res.
                status(404)
                .json({
                    success: false,
                    message: 'an error has occured',
                    data:e.message
                })  
                return; // works, `e` narrowed to Error
            }
        }

    },
    getAuth :  async (req:Request ,res:Response)=>{
        try {
            const user = ( req as unknown as Auth).user
            const authUser: Utilisateur | null = await prisma.utilisateur.findFirst({
                where:{
                    id:user
                }
            });
            if(!authUser){
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }  
            const userGet = await prisma.utilisateur.findUnique({
                where:{
                    id:authUser.id
                }
            })
            if(!userGet){
                res.json({
                    success: false,
                    message: "Utilisateur introuvable dans notre base"
                });
                return;
            }
            res.json({
                success: true,
                utilisateur : userGet
            });   
        } catch (e) {
            if (typeof e === "string") {
                console.log( e.toUpperCase()) 
            } 
            else if (e instanceof Error) {
                res.
                status(404)
                .json({
                    success: false,
                    message: 'an error has occured',
                    data:e.message
                })  
                return; // works, `e` narrowed to Error
            }
        }

    },
    getAll :  async (req:Request ,res:Response)=>{
        try {
            const allUser : Utilisateur[] = await prisma.utilisateur.findMany({
                
            })
            res.json({
                success: false,
                utilisateurs: allUser
            });
            
        } catch (e) {
            if (typeof e === "string") {
                console.log( e.toUpperCase()) 
            } 
            else if (e instanceof Error) {
                res.
                status(404)
                .json({
                    success: false,
                    message: 'an error has occured',
                    data:e.message
                })  
                return; // works, `e` narrowed to Error
            }
        }

    }
}

export default Utilisateurs