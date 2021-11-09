import { Request } from 'express';

import {
  AddressDocument,
  statusesPreventingUpdate,
} from '../model/address.model';

import addressService from '../service/address.service';

import ForbiddenError from '../error/ForbiddenError';
import ResourceNotFoundError from '../error/ResourceNotFoundError';
import ConflictError from '../error/ConflictError';

import RequestHandler from '../service/request/RequestHandler';
import DeletedResourceResponse from '../service/response/DeletedResourceResponse';
import AbstractResponse from '../service/response/AbstractResponse';
import ResourceResponse from '../service/response/ResourceResponse';
import CreatedResourceResponse from '../service/response/CreatedResourceResponse';

const findAddressesHandler: RequestHandler =
  async (): Promise<AbstractResponse> => {
    const result: AddressDocument[] = await addressService.findAll();
    return new ResourceResponse(result);
  };

const findAddressHandler: RequestHandler = async (
  request: Request
): Promise<AbstractResponse> => {
  const addressId: string = request.params.id;
  const address: AddressDocument | null = await addressService.findAddress({
    _id: addressId,
  });

  if (!address) {
    throw new ResourceNotFoundError('Address not found');
  }

  return new ResourceResponse(address);
};

const createAddressHandler: RequestHandler = async (
  request: Request
): Promise<AbstractResponse> => {
  const address: AddressDocument = await addressService.createAddress(
    request.body
  );
  return new CreatedResourceResponse(address, `${request.url}/${address.id}`);
};

const updateAddressHandler: RequestHandler = async (
  request: Request
): Promise<AbstractResponse> => {
  const addressId: string = request.params.id;
  const address: AddressDocument | null = await addressService.findAddress({
    _id: addressId,
  });

  if (!address) {
    throw new ResourceNotFoundError('Address not found');
  }

  if (statusesPreventingUpdate.includes(<string>address.status)) {
    throw new ForbiddenError(
      `Action not allowed for status: '${address.status}'`
    );
  }

  const updatedAddress: AddressDocument | null =
    await addressService.findAndUpdate({ _id: addressId }, request.body, {
      new: true,
    });

  return new ResourceResponse(<AddressDocument>updatedAddress);
};

const deleteAddressHandler: RequestHandler = async (
  request: Request
): Promise<AbstractResponse> => {
  const addressId: string = request.params.id;
  const address: AddressDocument | null = await addressService.findAddress({
    _id: addressId,
  });

  if (!address) {
    return new DeletedResourceResponse();
  }

  try {
    await addressService.deleteAddress({ _id: addressId });
    return new DeletedResourceResponse();
  } catch (e) {
    throw new ConflictError('Address was not deleted. Please try again');
  }
};

export default {
  findAddressesHandler,
  findAddressHandler,
  createAddressHandler,
  updateAddressHandler,
  deleteAddressHandler,
};
