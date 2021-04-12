import { normalizedUsers } from '../../fixtures';
import { USERCREATE } from '../constants';

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({ ...acc, [user.id]: user }),
  {}
);

export default (users = defaultUsers, action) => {
  const { type, id, name } = action;
  switch (type) {
    case USERCREATE:
      return { ...users, [id]: { id, name } }
    default:
      return users;
  }
};
