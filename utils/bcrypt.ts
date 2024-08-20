import { hash, compare, genSalt } from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt = await genSalt(10);
        return await hash(password, salt);
    } catch (e) {
        if (typeof e === "string") {
            console.log(e.toUpperCase()); // fonctionne, `e` est réduit à une chaîne de caractères
        } else if (e instanceof Error) {
            console.log(e.message); // fonctionne, `e` est réduit à une instance de Error
        }
        throw e; // renvoie l'erreur après l'avoir traitée
    }
};


export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        return await compare(password, hashedPassword);
    } catch (e) {
        if (typeof e === "string") {
            console.log(e.toUpperCase()); // fonctionne, `e` est réduit à une chaîne de caractères
        } else if (e instanceof Error) {
            console.log(e.message); // fonctionne, `e` est réduit à une instance de Error
        }
        return false; // retourne false en cas d'erreur lors de la comparaison
    }
};