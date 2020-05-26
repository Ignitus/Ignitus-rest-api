// eslint-disable-next-line func-names
import { Response } from 'express';

export const responseHandler = {
  success(res: Response, response: any) {
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Success',
      data: response,
    });
  },
  error(
    res: Response,
    message: string = 'Internal Server Error!',
    statusCode: number = 400,
  ) {
    res.status(statusCode).json({
      message,
      statusCode,
      success: false,
    });
  },
};
