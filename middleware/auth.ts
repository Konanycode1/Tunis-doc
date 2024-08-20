import { Auth } from './../interface';
import { Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import { verifyToken } from '../utils/token';
import { prisma } from '../utils/prisma';


export const Authenticate = async (req:Request,res:Response, next:NextFunction)=>{
    const secretKey = process.env.TOKEN_SECRET || 'key work API';
    const authHearder =( req.headers as  any)["authorization"];
    if(authHearder){
        const token = authHearder.split(' ')[1];
        const result = await verifyToken(token);
       try {    
            if(result){
                (req as unknown as Auth).user = (result as any).id;
                next();
            }
            else{
                res.
                status(404)
                .json({
                    success: false,
                    message: 'token is not exist, Please connect you again'
                })
                return;
            }
       } catch (error) {
        res.
        status(404)
        .json({
            success: false,
            message: 'an error has occured'
        })
        return;
       }
    }
    else{
        res.
        status(404)
        .json({
            success: false,
            message: 'You token is undefined'
        })
        return;
    }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user;
    if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const user = await prisma.utilisateur.findUnique({ where: { id: userId } });
    if (user) {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Forbidden: Admins only' });
    }
};

