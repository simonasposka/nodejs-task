import { Schema, Document, model } from 'mongoose';

export const statusesPreventingUpdate: string[] = [
  'not interested',
  'interested',
];

export const validStatuses: string[] = [
  'not at home',
  'not interested',
  'interested',
];

export interface AddressDocument extends Document {
  id: String;
  name: String;
  email: String;
  country: String;
  city: String;
  street: String;
  postalcode: String;
  number: Number;
  numberAddition: String;
  status: String;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema: Schema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    postalcode: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    numberAddition: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: false,
      default: null,
    },
    email: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

AddressSchema.set('toJSON', {
  transform: (_document: AddressDocument, returnedObject: AddressDocument) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
  virtuals: true,
});

export default model<AddressDocument>('Address', AddressSchema);
