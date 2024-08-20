import { Utilisateur } from '../interface';
import {Request, Response } from "express";
import { prisma } from "./prisma";


export const verifyUserEmail = async (code:string): Promise<Utilisateur | null> =>{
    try {
        const verify: Utilisateur | null= await prisma.utilisateur.findFirst({
            where: {
                code
            }
        })
        return verify;
    } catch (error) {
        console.error("Error verifying user email:", error);
        return null;
    }
}
export const verifyUserCode = async (code:string): Promise<Utilisateur | null> =>{
    try {
        const verify: Utilisateur | null= await prisma.utilisateur.findFirst({
            where: {
                code
            }
        })
        return verify;
    } catch (error) {
        console.error("Error verifying user email:", error);
        return null;
    }
}