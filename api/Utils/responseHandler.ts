import { Response } from 'express';
import { InterfaceTestimonialModel } from 'api/Models/@modelTypes/interfaceTestimonialModel';
import { InterfaceOpportunityModel } from 'api/Models/@modelTypes/interfaceOpportunityModel';

export const responseHandler = {
  success(
    res: Response,
    response:
      | InterfaceTestimonialModel
      | InterfaceTestimonialModel[]
      | InterfaceOpportunityModel
      | InterfaceOpportunityModel[]
      | null
      | Record<string, unknown>,
  ) {
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
