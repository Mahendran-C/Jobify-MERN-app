import express from 'express' ;
import { getCurrentUser, login, register, updateUser, logout } from '../controllers/authControllers.js';
import authMiddleWare from '../middleware/auth.js';
import rateLimiter from 'express-rate-limit';
import testUser from "../middleware/testUser.js";


const router = express.Router();

const apiLimiter = rateLimiter({
  // validate: {validationsConfig: false, default: true},
  windowMs: 1000 * 60 * 15,
  max: 10,
  message: 'Too many requests from this IP, please try agian after some time',
  },);
  

// router.route('/register').post((req, res)=> res.send('register'))

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/updateUser').put(authMiddleWare, testUser, updateUser);

router.route('/getCurrentUser').get(authMiddleWare, getCurrentUser);
router.get('/logout', logout);


export  default router;