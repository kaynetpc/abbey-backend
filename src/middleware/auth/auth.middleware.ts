import express from 'express';
import { AppConfigs } from '../../config/app';
import jwt from 'jsonwebtoken';
import { ResponseService } from '../../response/responseService';
import { recognizedUrlToBeExcludedFromAuthCheck } from '../../config/app.recognizedUrl';

export const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const reqUrl = req.url;   
   
    for(const url of recognizedUrlToBeExcludedFromAuthCheck) {
        if(reqUrl.includes(url)) {
            next();
            return;
        }
        
    }
    try {
        const authHeaders = req.headers["authorization"];
        const token = authHeaders && authHeaders.split(' ')[1];

      

        if(token === undefined) {
            ResponseService.send({data: null, message: 'Permission denied', response: res, statusCode: 401});
            return;
        }

        const validateToken = verifyToken(token, AppConfigs.JWT_SECRET);

        if(!validateToken.isValid) {
            ResponseService.send({data: null, message: validateToken.errorMsg, response: res, statusCode: 401});
            return;
        }
        const decryptedToken = validateToken.payload as any;

        if(decryptedToken.tokenType !== "access") {
            ResponseService.send({data: null, message: 'Invalid access token', response: res, statusCode: 403});
            return;
        }

        if(!decryptedToken?.user?.id) {
            ResponseService.send({data: null, message: 'Permission denied', response: res, statusCode: 403});
            return;
        }
        const usrData = validateToken.payload as any
        req.app.locals.userID = usrData?.user?.id;
        next();    
    } catch (error: any) {
        ResponseService.send({data: "Unauthorized", message: 'Permission denied', response: res, statusCode: 500});
    }
}


export const verifyToken = (token: string, accessTokenSecret: string) => {
    try {
      const decoded = jwt.verify(token, accessTokenSecret);
      return {
        isValid: true,
        payload: decoded,
        errorMsg: ''
      };
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        // Token has expired
        return {
            isValid: false,
            errorMsg: 'Token has expired',
            payload: null
        };
    } else if (err instanceof jwt.JsonWebTokenError) {
        // Invalid token
        return {
            isValid: false,
            errorMsg: 'Invalid token', //'InvalidToken',
            payload: null
        };
    } else {
        // Other errors
        return {
          isValid: false,
          errorMsg: 'Error occur' , // 'UnknownError',
          payload: null
        };
      }
    }
  }