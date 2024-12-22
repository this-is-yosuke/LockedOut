import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        user?: RiddlePayload;
    }
}

interface RiddlePayload {
    username: string;
}

// Middleware function to authenticate JWT token
export const riddleToken = (req: Request, res: Response, next: NextFunction): void => {
    // Get the authorization header from the request
    const riddleHeader = req.headers.authorization;

    // Check if the authorization header is present
    if (riddleHeader) {
        // Extract the token from the authorization header (format: "Bearer <token>")
        const token = riddleHeader.split(' ')[1];

        // Get the secret key from the environment variables
        const secretKey = process.env.JWT_SECRET_KEY || '';

        // Verify the JWT token
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                console.error("Token verification failed:", err);
                // Handle specific error scenarios
                if (err.name === 'TokenExpiredError') {
                    res.status(401).json({ message: 'Token expired' }); // Send response for expired token
                    return; // Exit the function immediately
                }
                res.status(403).json({ message: 'Forbidden' }); // Token invalid
                return; // Exit the function immediately
            }

            // Attach the user information to the request object
            req.user = user as RiddlePayload;

            // Call the next middleware function
            next(); 
        });
    } else {
        // If the authorization header is missing
        console.log("No token provided");
        res.status(401).json({ message: 'Authorization header is missing' }); // Send response for missing token
        return; // Exit the function immediately
    }
};