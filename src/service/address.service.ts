import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from 'mongoose';
import Address, { AddressDocument } from '../model/address.model';

const findAll = async (): Promise<AddressDocument[]> => await Address.find();

const findAddress = async (
  query: FilterQuery<AddressDocument>,
  options: QueryOptions = { lean: false }
): Promise<AddressDocument | null> => {
  return await Address.findOne(query, {}, options);
};

const createAddress = async (
  input: DocumentDefinition<AddressDocument>
): Promise<AddressDocument> => await Address.create(input);

const findAndUpdate = async (
  query: FilterQuery<AddressDocument>,
  input: UpdateQuery<AddressDocument>,
  options: QueryOptions = { lean: false }
): Promise<AddressDocument | null> => {
  return await Address.findOneAndUpdate(query, input, options);
};

const deleteAddress = async (
  query: FilterQuery<AddressDocument>
): Promise<object> => {
  return Address.deleteOne(query);
};

export default {
  findAll,
  findAddress,
  createAddress,
  findAndUpdate,
  deleteAddress,
};
