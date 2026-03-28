import { Request, Response, NextFunction } from "express"

function validImageUrl(url: string): boolean {
    try {
        const parsed = new URL(url);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
}

export function validateProperty(req: Request, res: Response, next: NextFunction) {
    const { name, location, image_url } = req.body

    if (!name || name.trim().length < 3)
        return res.status(400).json({ message: "Property name must be at least 3 characters" })

    if (!location || location.trim().length < 3)
        return res.status(400).json({ message: "Location must be at least 3 characters" })

    if (!image_url || !validImageUrl(image_url))
        return res.status(400).json({ message: "A valid image URL is required" })

    next()
}