/** @jsx jsx */
import { Flex, jsx } from 'theme-ui';
import UserCard from '../user-card';
import * as styles from './index.styles';

/**
 * Renders a list of User Cards
 * @param {Array<Object>} users a list of users
 */
const UserList = ({ users }) => {
  return (
    <Flex sx={styles.userListCss}>
      {users?.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </Flex>
  );
};

export default UserList;
