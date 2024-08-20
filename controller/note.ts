import { Request, Response } from 'express';
import { Note,Auth,Utilisateur, Films } from './../interface';
import { prisma } from "../utils/prisma";

const Notes = {
    create :  async (req:Request ,res:Response)=>{
        try {
            const filmsId = req.query.filmsId
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
            const {note} = req.body
            if(note === undefinedValue){
                res.json({
                    sucess:false,
                    message:"la note is not exist, please enter your la note"
                })
                return
            }
            const filmGet: Films | null = await prisma.films.findFirst({
                where:{
                    id:filmsId as string
                }
            })
            if(!filmGet){
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            
            const createUser = await prisma.note.create({
                data:{
                    note,
                    idJury: authUser.id,
                    filmsId:filmsId as string
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
            const noteGet: Note | null = await prisma.note.findUnique({
                where:{
                    id
                }
            })
            if(noteGet == null){
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            await prisma.projection.delete({
                where:{
                    id:noteGet.id
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
            const noteGet = await prisma.projection.findUnique({
                where:{
                    id
                }
            })
            if(!noteGet){
                res.json({
                    success: false,
                    message: "Films introuvable dans notre base"
                });
                return;
            }
            res.json({
                success: true,
                note : noteGet
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
            const allNote : Note[] = await prisma.note.findMany({
                include:{
                    films:true,
                    Jury:true
                }
            })
            res.json({
                success: false,
                note: allNote
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

export default Notes