/** @jsx jsx */
import { useHistory } from 'react-router-dom';
import { Avatar, Card, Flex, jsx, Text } from 'theme-ui';
import * as styles from './index.styles';

/**
 * Renders a user card with the avatar and username
 * @param {object} user a user
 */
const UserCard = ({ user }) => {
  const history = useHistory();

  return (
    <Card
      sx={styles.userCardCss}
      onClick={() => history.push(`/profile/${user._id}`)}
    >
      <Flex>
        <Avatar src={user.profile.avatar}></Avatar>
      </Flex>
      <Text variant="default">{user.username}</Text>
    </Card>
  );
};

export default UserCard;
