import mongoose from 'mongoose';
import { DatabaseConnectionError } from '../../common/src/errors/database-connection-error';
import {app} from './app';
const start = async () =>{
  if(!process.env.JWT_KEY){
    throw new Error('JWT key must be defined');
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017");
  }catch(err){
    throw new DatabaseConnectionError();
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();
