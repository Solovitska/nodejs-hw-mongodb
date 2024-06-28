import { Contact } from '../db/models/contacts.js';

export const getAllContacts = () => Contact.find();

export const getContactById = (contactId) => Contact.findById(contactId);

export const createContact = (data) => Contact.create(data);

export const updateContact = async (contactId, data, options = {}) => {
  const result = await Contact.findOneAndUpdate({ _id: contactId }, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  return {
    data: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

export const deleteContact = (contactId) =>
  Contact.findOneAndDelete({ _id: contactId });
