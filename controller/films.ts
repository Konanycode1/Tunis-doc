import { Request, Response } from 'express';
import { Films, Auth, Projection,Utilisateur } from './../interface';
import { prisma } from "../utils/prisma";

const Film = {
    create :  async (req:Request ,res:Response)=>{
        try {
            const undefinedValue = "" || " " || null || undefined;
            const user = ( req as unknown as Auth).user
            const authUser = await prisma.utilisateur.findFirst({
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
            const {code, titre,dateCreate,sujet,productionId,realisateurId} = req.body
            if(code === undefinedValue){
                res.json({
                    sucess:false,
                    message:"code is not exist, please enter your code"
                })
                return
            }
            if(titre === undefinedValue){
                res.json({
                    sucess:false,
                    message:"titre is not exist, please enter your titre"
                })
                return
            }
            if(dateCreate === undefinedValue){
                res.json({
                    sucess:false,
                    message:"dtaCreate is not exist, please enter your dtaCreate"
                })
                return
            }
            if(sujet === undefinedValue){
                res.json({
                    sucess:false,
                    message:"sujet is not exist, please enter your sujet"
                })
                return
            } 
            if(productionId === undefinedValue){
                res.json({
                    sucess:false,
                    message:"réalisateur is not exist, please enter your réalisateur"
                })
                return
            }
            if(realisateurId === undefinedValue){
                res.json({
                    sucess:false,
                    message:"Producteur is not exist, please enter your Producteur"
                })
                return
            } 
              // Création de l'entrée Films avec les relations
            const newFilm = await prisma.films.create({
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

            if(!newFilm){
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
            const user = ( req as unknown as Auth).user
            const authUser: Utilisateur | null = await prisma.utilisateur.findFirst({
                where:{
                    id:user,
                }
            });
            if(authUser === null){
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }  
            const userGet = await prisma.films.findUnique({
                where:{
                    id
                }
            })
            if(userGet == null){
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            await prisma.films.delete({
                where:{
                    id:userGet.id
                }
            })
            res.json({
                success: true,
                message: "Films supprimé dans notre base"
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
            const filmGet = await prisma.films.findUnique({
                where:{
                    id
                }
            })
            if(!filmGet){
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            res.json({
                success: true,
                Films : filmGet
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
            const allUsers: Films[]  = await prisma.films.findMany({
                include:{
                    utilisateur:true,
                    production:true,
                    realisateur:true,
                    Note:true
                }
            })
            res.json({
                success: false,
                Filmss: allUsers
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

export default Film