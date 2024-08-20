import { Response,Request } from 'express';
import { prisma } from '../utils/prisma';
import { Production, Realisateur,Utilisateur,Auth } from './../interface';

const Add = {

    createProd: async (req:Request,res:Response)=>{
       try {
        const undefinedValue = "" || " " || null || undefined
        const user = ( req as unknown as Auth).user
            const authUser: Utilisateur | null = await prisma.utilisateur.findFirst({
                where:{
                    id:user,
                    role: "RespoInspection" || "ADMIN"
                }
            });
            if(authUser === null){
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            } 
            const {code,nom, prenom,dateNaissance} = req.body;
            if(code === undefinedValue){
                res.json({
                    success: false,
                    message: "code producteur introuvable"
                });
                return
            }
            if(nom === undefinedValue){
                res.json({
                    success: false,
                    message: "nom producteur introuvable"
                });
                return
            }
            if(prenom === undefinedValue){
                res.json({
                    success: false,
                    message: "prenom producteur introuvable"
                });
                return
            }
            if(dateNaissance === undefinedValue){
                res.json({
                    success: false,
                    message: "date de Naissance producteur introuvable"
                });
                return
            }

            await prisma.production.create({
                data:{
                    code,
                    nom,
                    prenom,
                    dateNaissance: new Date(dateNaissance),
                    inspectionId: authUser.id
                }
            })
            res.json({
                success:true,
                message: "Producteur ajouter avec succès"
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
    createReal: async (req:Request,res:Response)=>{
        try {
            const undefinedValue = "" || " " || null || undefined
            const user = ( req as unknown as Auth).user
            const authUser: Utilisateur | null = await prisma.utilisateur.findFirst({
                 where:{
                     id:user,
                     role: "RespoInspection" || "ADMIN"
                 }
             });
             if(authUser === null){
                 res.json({
                     success: false,
                     message: "You are not authorized"
                 });
                 return;
             } 
             const {code,nom, prenom,dateNaissance} = req.body;
             if(code === undefinedValue){
                 res.json({
                     success: false,
                     message: "code producteur introuvable"
                 });
                 return
             }
             if(nom === undefinedValue){
                 res.json({
                     success: false,
                     message: "nom producteur introuvable"
                 });
                 return
             }
             if(prenom === undefinedValue){
                 res.json({
                     success: false,
                     message: "prenom producteur introuvable"
                 });
                 return
             }
             if(dateNaissance === undefinedValue){
                 res.json({
                     success: false,
                     message: "date de Naissance producteur introuvable"
                 });
                 return
             }
 
             await prisma.realisateur.create({
                 data:{
                     code,
                     nom,
                     prenom,
                     dateNaissance: new Date(dateNaissance),
                     inspectionId: authUser.id
                 }
             })
             res.json({
                 success:true,
                 message: "Réalisateur ajouter avec succès"
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
    deleteProd: async (req:Request,res:Response)=>{
        try {
            const {id} = req.params;
            const user = ( req as unknown as Auth).user
            const authUser: Utilisateur | null = await prisma.utilisateur.findFirst({
                 where:{
                     id:user,
                     role: "RespoInspection" || "ADMIN"
                 }
             });
             if(authUser === null){
                 res.json({
                     success: false,
                     message: "You are not authorized"
                 });
                 return;
            }
            const verifyId: Production | null = await prisma.production.findUnique({
                where:{
                    id
                }
            })
            if(verifyId === null){
                res.json({
                    success:false,
                    message: "Producteur introuvable !!"
                });
                return
            }
            await prisma.production.delete({
                where:{
                    id:verifyId.id
                }
            })

            res.json(
                {
                    success:true,
                    message: 'Producteur supprimé'
                }
            ) 
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
    deleteReal: async (req:Request,res:Response)=>{
        try {
            const {id} = req.params;
            const user = ( req as unknown as Auth).user
            const authUser: Utilisateur | null = await prisma.utilisateur.findFirst({
                 where:{
                     id:user,
                     role: "RespoInspection" || "ADMIN"
                 }
             });
             if(authUser === null){
                 res.json({
                     success: false,
                     message: "You are not authorized"
                 });
                 return;
            }
            const verifyId: Realisateur | null = await prisma.realisateur.findUnique({
                where:{
                    id
                }
            })
            if(verifyId === null){
                res.json({
                    success:false,
                    message: "Producteur introuvable !!"
                });
                return
            }
            await prisma.realisateur.delete({
                where:{
                    id:verifyId.id
                }
            })

            res.json(
                {
                    success:true,
                    message: 'Réalisateur supprimé'
                }
            ) 
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
    getAllProd: async (req:Request, res:Response)=>{
        try {
            const ProducteurAll : Production[] = await prisma.production.findMany({
                include:{
                    utilisateur:true
                }
            })
            res.json({
                success:true,
                producteur:ProducteurAll
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
    getAllReal: async (req:Request, res:Response)=>{
        try {
            const realisateurAll : Realisateur[] = await prisma.realisateur.findMany({
                include:{
                    utilisateur:true
                }
            })
            res.json({
                success:true,
                realisateur:realisateurAll
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
    }
}
export default Add