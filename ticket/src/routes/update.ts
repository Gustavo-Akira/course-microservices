import { requireAuth, validationRequest } from '@akirauekita2002/common';
import express, {Request, Response} from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.put('/api/tickets/:id', 
    requireAuth,
    [ body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('price')
    .isFloat({gt: 0})
    .withMessage('Price must be greater than 0')],
    validationRequest,
    async (req: Request, res: Response) => {
    
});

export {router as updateTicketRouter};