import { requireAuth } from "@akirauekita2002/common";
import express,{ Request, Response } from "express";

const router = express.Router();

router.post('/api/tickets', requireAuth, (req: Request, res: Response)=>{
    res.sendStatus(200);
});

export { router as createTicketRoute};