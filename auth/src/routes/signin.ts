import express, {Request, Response} from 'express';
import { body} from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { Password } from '../services/password';
import { EmailPasswordNotMatchError, UserNotExistsError, validationRequest } from '@akirauekita2002/common';

const router = express.Router();

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password have to be passed ')
],validationRequest,
async (req: Request, res: Response) => {
  const {email, password} = req.body;
  const existingUser = await User.findOne({email});
  if(!existingUser){
    throw new UserNotExistsError(email);
  }

  const passwordMatch = await Password.compare(existingUser.password, password);

  if(!passwordMatch){
    throw new EmailPasswordNotMatchError();
  }

  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  },process.env.JWT_KEY!);

  req.session = {
    jwt: userJwt
  }

  res.status(200).send(existingUser);
});

export { router as signinRouter };
