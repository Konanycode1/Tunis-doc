import { Request, Response } from 'express';
import { Projection,Auth,Films } from './../interface';
import { prisma } from "../utils/prisma";
import { Utilisateur } from '@prisma/client';

const Projections = {
    create :  async (req:Request ,res:Response)=>{
        try {
            const undefinedValue = "" || " " || null || undefined;
            const user = ( req as unknown as Auth).user
            const authUser = await prisma.utilisateur.findFirst({
                where:{
                    id:user,
                    role: "RespoProduction"
                }
            });
            if(!authUser){
                res.json({
                    success: false,
                    message: "You are not authorized"
                });
                return;
            }
            const {jour, date,lieu,salle,filmsId} = req.body
            if(jour === undefinedValue){
                res.json({
                    sucess:false,
                    message:"jour is not exist, please enter your jour"
                })
                return
            }
            if(date === undefinedValue){
                res.json({
                    sucess:false,
                    message:"date is not exist, please enter your date"
                })
                return
            }
            if(lieu === undefinedValue){
                res.json({
                    sucess:false,
                    message:"dtaCreate is not exist, please enter your dtaCreate"
                })
                return
            }
            if(salle === undefinedValue){
                res.json({
                    sucess:false,
                    message:"la salle is not exist, please enter your la salle"
                })
                return
            }
            const filmGet: Films | null = await prisma.films.findUnique({
                where: { id: filmsId }
            })
            if(!filmGet){
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            
            const createUser = await prisma.projection.create({
                data:{
                    jour,
                    date,
                    lieu,
                    salle,
                    idResProd: authUser.id,
                    filmsId
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
            const projectGet: Projection | null = await prisma.projection.findUnique({
                where:{
                    id
                }
            })
            if(projectGet == null){
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            await prisma.projection.delete({
                where:{
                    id:projectGet.id
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
            const projectGet = await prisma.projection.findUnique({
                where:{
                    id
                }
            })
            if(!projectGet){
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            res.json({
                success: true,
                Films : projectGet
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
            const allProjection : Projection[] = await prisma.projection.findMany({
                include:{
                    films:true,
                    Responsable:true
                }
            })
            res.json({
                success: true,
                projection: allProjection
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

export default Projections