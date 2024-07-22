import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@akirauekita2002/common';
import { createTicketRoute } from './routes/new';
import { showTicketRouter } from './routes/show';
import { listTicketRoute } from './routes';
import { updateTicketRouter } from './routes/update';


const app = express();
app.use(json());
app.set('trust proxy',true);
app.use(cookieSession({
  signed:false,
  secure: process.env.NODE_ENV !== "test"
}));
app.use(currentUser);
app.use(createTicketRoute);
app.use(showTicketRouter);
app.use(listTicketRoute);
app.use(updateTicketRouter);
app.all('*',async (req, res)=>{
   throw new NotFoundError();
});
app.use(errorHandler);

export {app};