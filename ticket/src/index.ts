import mongoose from 'mongoose';
import {app} from './app';
import { DatabaseConnectionError } from '@akirauekita2002/common';
const start = async () =>{
  if(!process.env.JWT_KEY){
    throw new Error('JWT key must be defined');
  }
  try {
    await mongoose.connect("mongodb://ticket-mongo-srv:27017");
  }catch(err){
    throw new DatabaseConnectionError();
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();
