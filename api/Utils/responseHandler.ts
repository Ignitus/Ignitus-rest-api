// eslint-disable-next-line func-names
import { Response } from 'express';

const responseHandler = {
  success(res: Response, response: any) {
    res.json({
      statusCode: 200,
      success: true,
      message: 'Success',
      data: response
    });
  },
  error(
    res: Response,
    message: string = 'Internal Server Error!',
    statusCode: number = 500
  ) {
    res.json({ message, statusCode, success: false });
  }
};

export default responseHandler;
