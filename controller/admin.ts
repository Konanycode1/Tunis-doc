
import { Request, Response } from 'express';
import { Auth, Admin } from './../interface';
import { prisma } from "../utils/prisma";
import { verifyUserCode } from '../utils/verify';
import { comparePassword, hashPassword } from '../utils/bcrypt';
import { generateToken } from '../utils/token';


const Admins = {
    create :  async (req:Request ,res:Response)=>{
        try {
            const undefinedValue = "" || " " || null || undefined;
            const {user,password} = req.body
            const createUser = await prisma.admin.create({
                data:{
                    user,
                    password
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
    delete :  async (req:Request ,res:Response)=>{
        try {
            const {id} = req.params 
            const userGet: Admin | null = await prisma.admin.findUnique({
                where:{
                    id
                }
            })
            if(userGet == null){
                res.json({
                    success: false,
                    message: "admin introuvable dans notre base"
                });
                return;
            }
            await prisma.admin.delete({
                where:{
                    id:userGet.id
                }
            })
            res.json({
                success: true,
                message: "admin supprimé dans notre base"
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
            const userGet = await prisma.admin.findUnique({
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
                admin : userGet
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
            const allUser : Admin[] = await prisma.admin.findMany({
                
            })
            res.json({
                success: false,
                Admins: allUser
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

export default Admins