import { UnauthenticatedError } from "../errors/index.js";
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) =>{
    // const authHeader = req.headers.authorization;
    // console.log('coo', req.cookies);

    // if (!authHeader || !authHeader.startsWith('Bearer')) {
    //     throw new UnauthenticatedError('Expected JWT token to do this action');
    // }
    // const token = authHeader.split(' ')[1];

    const token = req.cookies.token;
    if(!token) throw new UnauthenticatedError('Authentication Invalid');

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);
        req.user = {
          userId: payload.userid,
          testUser: payload.userid === '666e63cab145e3a502aa8310',
        };
        next();
      } catch (err) {
        throw new UnauthenticatedError('JWT is meesed up');
      }
    
}

export default auth;