import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: RiddlePayload;
    }
}
import jwt from 'jsonwebtoken';


interface RiddlePayload {
    username: string;
}

// Middleware function to authenticate JWT token
export const RiddleToken = (req: Request, res: Response, next: NextFunction) => {
    // Get the authorization header from the request
    const riddleHeader = req.headers.authorization;

    // Check if the authorization header is present
    if (riddleHeader) {
        // Extract the token from the authorization header
        const token = riddleHeader.split(' ')[1];

        // Get the secret key from the environment variables
        const secretKey = process.env.JWT_SECRET_KEY || '';

        // Verify the JWT token
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Send forbidden status if the token is invalid
            }

            // Attach the user information to the request object
            req.user = user as RiddlePayload;
            return next(); // Call the next middleware function
        });
    } else {
        res.sendStatus(401); // Send unauthorized status if no authorization header is present
    }
};
