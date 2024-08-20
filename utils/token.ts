import jwt from "jsonwebtoken";
import { config } from "dotenv";
import path  from "path";

config(
    { path: path.resolve(process.cwd(), "../.env") }
);


export const generateToken = (payload: object) => {
    try {
        const secret = process.env.TOKEN_SECRET as string 
        return jwt.sign(payload, secret, {
            expiresIn: "1d"
        })
        
    } catch (e: unknown) {
        if (typeof e === "string") {
            console.log( e.toUpperCase()) // works, `e` narrowed to string
         } else if (e instanceof Error) {
             console.log(e.message) // works, `e` narrowed to Error
         }
    }
};

export const verifyToken = (tokenValue: string): string | object | undefined=> {
    try {
        const secret = process.env.TOKEN_SECRET as string 
        return jwt.verify(tokenValue, secret)
        
    } catch (e: unknown) {
        if (typeof e === "string") {
            console.log( e.toUpperCase()) // works, `e` narrowed to string
         } else if (e instanceof Error) {
             console.log(e.message) // works, `e` narrowed to Error
         }
    }
}
