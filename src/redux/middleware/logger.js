import { v4 as uuidv4 } from 'uuid';
import { USERCREATE, REVIEWCREATE } from '../constants';

export default (store) => (next) => (action) => {
  const { type } = action;
  const userId = uuidv4();
  const reviewId = uuidv4();
  console.log(action);
  if (type === USERCREATE) {
    return next({ ...action, id: userId });
  } else if (type === REVIEWCREATE) {
    console.log(action);
    return next({ ...action, id: reviewId, userId: userId });
  }

  return next(action);
};
