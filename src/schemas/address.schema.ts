import { object, string, number, mixed, AnySchema } from 'yup';
import { countryCodes } from '../service/countries.service';
import { validStatuses } from '../model/address.model';

const createAddressSchema: AnySchema = object({
  body: object({
    country: mixed()
      .required('country is required')
      .oneOf(countryCodes, 'country must be a valid ISO 3166-1 alpha-2 code'),
    city: string().required('city is required'),
    street: string().required('street is required'),
    postalcode: string()
      .required('postalcode is required')
      .length(5, 'postalcode must be 5 characters long')
      .matches(/^[0-9]+$/, 'postalcode can only contain digits'),
    number: number()
      .required('number is required')
      .integer('number has to be an integer')
      .positive('number has to be a positive number'),
    numberAddition: mixed().required('numberAddition is required'),
  }),
});

const updateAddressSchema: AnySchema = object({
  body: object({
    status: string()
      .required('status is required')
      .oneOf(validStatuses, 'invalid status'),
    name: string(),
    email: string().email('email must be a valid email'),
  }),
});

export default {
  createAddressSchema,
  updateAddressSchema,
};
