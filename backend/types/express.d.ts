declare global {
    namespace Express {
        interface Request {
            user?: any
            cookies?: Record<string, string>
        }
    }
}

export {}