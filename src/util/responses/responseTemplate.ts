import { Response } from "express";

type ResponseStatus = 'success' | 'fail' | 'error';

interface ApiResponse<T = unknown> {
    status: ResponseStatus;
    message: string;
    data? : T;
    errors?: T[] | T;
    code: Number;
}

export function sendSuccess<T>(res: Response, message: string, data?: T, code=200) {
    const response: ApiResponse<T> = {
        status: 'success',
        message,
        data,
        code
      };
      return res.status(code).json({...response});
}

export function sendCookie<T>(res: Response, cookieName: string, cookieValue: string, message: string, data?: T, code=201) {
  const response: ApiResponse<T> = {
    status: 'success',
    message,
    data,
    code
  }
  return res.status(code).cookie(cookieName, cookieValue).json({ ...response })
}

export function sendError<T>(res: Response, message: string, errors: T, code = 500) {
    const response: ApiResponse<T> = {
      status: 'error',
      message,
      errors, 
      code
    };
    return res.status(code).json({ ...response })
}