import { Request, Response, NextFunction } from "express"

function validEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function validPassword(password: string): boolean {
    return password.length >= 8 && password.length <= 16;
}

function validName(name: string): boolean {
    return name.length >= 3 && name.length <= 8;
}

export function validateSignup(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body

    if (!name || !validName(name))
        return res.status(400).json({ message: "Name must be between 3 and 8 characters" })

    if (!email || !validEmail(email))
        return res.status(400).json({ message: "Invalid email format" })

    if (!password || !validPassword(password))
        return res.status(400).json({ message: "Password must be between 8 and 16 characters" })

    next()
}