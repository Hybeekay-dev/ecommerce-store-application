import jwt from "jsonwebtoken";

export class Jwt{

    signPayload(payload: Record<string, any>): string{
        return jwt.sign(payload, `${process.env.SECRET_KEY}`, {expiresIn: '10h'})
    }

    verifyToken(token: string): any{
        return jwt.verify(token, `${process.env.SECRET_KEY}`)
    }
}