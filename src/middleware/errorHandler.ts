import { Request, Response, NextFunction } from 'express';
import { handleAuthError } from '../ErrorHandling/handleAuthError';
import { sendError } from '../util/responses/responseTemplate';
export const errorHandler = (err: any, req: Request, res: Response<{success: boolean, message: string, errors: Object}>, next: NextFunction) => {
  
  let errors = { username: '', email: '', password: '' };
  if (err?.message.includes('User validation failed')) {
    handleAuthError(err, errors);
  }

  const statusCode = err.httpCode || 500;
  const message = err.message || 'Something went wrong!'
  sendError(res, message, errors, statusCode)
};