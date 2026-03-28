import { Request, Response, NextFunction } from "express"

function validEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function validPassword(password: string): boolean {
    return password.length >= 8 && password.length <= 16;
}

export function validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body

    if (!email || !validEmail(email))
        return res.status(400).json({ message: "Invalid email format" })

    if (!password || !validPassword(password))
        return res.status(400).json({ message: "Password must be between 8 and 16 characters" })

    next()
}