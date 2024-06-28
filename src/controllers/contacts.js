import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactById,
    updateContact,
  } from '../services/contacts.js';
  import createHttpError from 'http-errors';

  export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: res.statusCode,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  };

  export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      next(createHttpError(404, `Contact with id '${contactId}' not found`));
      return;
    }

    res.status(200).json({
      status: res.statusCode,
      message: `Successfully found contact with id '${contactId}'!`,
      data: contact,
    });
  };

  export const createContactsController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  };

  export const updateContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const result = await updateContact(contactId, req.body);

    if (!result) {
      next(createHttpError(404, `Contact with id ${contactId} not found`));
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Successfully patched a contact with id '${contactId}'!`,
      data: result.data,
    });
  };

  export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const result = await deleteContact(contactId);

    if (!result) {
      next(createHttpError(404, `Contact with id ${contactId} not found`));
      return;
    }

    res.status(204).send();
  };
