import { Router, Request, Response, NextFunction } from 'express';
import validateRequest from './middleware/validateRequest';
import validMongooseObjectId from './middleware/validMongooseObjectId';
import response from './middleware/response';

import addressController from './controller/address.controller';
import addressSchema from './schemas/address.schema';

import ApiError from './error/ApiError';

const router = Router();
router.get('/address', response(addressController.findAddressesHandler));
router.get(
  '/address/:id',
  validMongooseObjectId,
  response(addressController.findAddressHandler)
);
router.post(
  '/address',
  validateRequest(addressSchema.createAddressSchema),
  response(addressController.createAddressHandler)
);
router.patch(
  '/address/:id',
  [validateRequest(addressSchema.updateAddressSchema), validMongooseObjectId],
  response(addressController.updateAddressHandler)
);
router.delete(
  '/address/:id',
  validMongooseObjectId,
  response(addressController.deleteAddressHandler)
);

router.all(
  '*',
  (_request: Request, _response: Response, next: NextFunction): void => {
    return next(ApiError.notFound('Route not found'));
  }
);

export default router;
