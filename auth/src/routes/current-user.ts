import { currentUser } from '@akirauekita2002/common';
import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get('/api/users/currentuser',currentUser, (req, res) => {
  res.send({currentUser: req.currentUser})
});

export { router as currentUserRouter };
