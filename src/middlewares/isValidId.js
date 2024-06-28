import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId) {
    return next(createHttpError(404, `'${id}' is not a valid id`));
  }
  next();
};

export default isValidId;
