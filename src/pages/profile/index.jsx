/** @jsx jsx */
import { jsx, Flex, Box, Avatar, Spinner, Text } from 'theme-ui';
import * as React from 'react';
import * as styles from './index.styles';
import CustomButton from '../../components/custom-button';
import AuthContext from '../../security/auth.context';
import ProfileService from '../../services/profile-service';
import { useParams } from 'react-router-dom';
import useLoadEvents from '../../hooks/useLoadEvents';
import Divider from '../../components/divider';
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  useTabState,
  Tab,
  TabList,
  TabPanel,
} from 'reakit';
import InputGroup from '../../components/input-group';
import EventsList from '../../components/events-list';
import UserList from '../../components/user-list';
import { ToastContext } from '../../components/toasts/toast.context';

const ProfilePage = () => {
  const { userId } = useParams();
  const [profileLoading, setProfileLoading] = React.useState(true);
  const [updatingProfile, setUpdatingProfile] = React.useState(false);
  const [{ profile, isProfileOwner, isFollowing }, setState] = React.useState(
    {}
  );
  const { loading, featured, normal } = useLoadEvents(userId);
  const [eventCount, setEventCount] = React.useState(0);
  const [{ user }] = React.useContext(AuthContext);
  const toast = React.useContext(ToastContext);
  const dialog = useDialogState();
  const tab = useTabState();

  React.useEffect(() => {
    async function loadProfile() {
      try {
        let profile = await ProfileService.getByUserId(userId);
        let myProfile = await ProfileService.getForCurrentUser();

        if (!profile || !myProfile) {
          throw new Error('Unable to load profile');
        }

        setState({
          profile,
          isProfileOwner: user?.id === profile.user?._id,
          isFollowing:
            myProfile.follows.filter(
              (follow) => follow._id === profile.user?._id
            ).length > 0,
        });
      } catch (error) {
        toast.error({
          title: 'error',
          message: 'Failed to load profile',
        });
      } finally {
        setProfileLoading(false);
      }
    }

    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id, userId]);

  React.useEffect(() => {
    if (featured && normal && !loading) {
      const featuredCount = featured.future.length + featured.past.length;
      const normalCount = normal.future.length + normal.past.length;
      setEventCount(featuredCount + normalCount);
    }
  }, [featured, normal, loading]);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      setUpdatingProfile(true);
      const { biography, phoneNumber } = e.target.elements;
      const updatedProfile = await ProfileService.update({
        biography: biography.value,
        phoneNumber: phoneNumber.value,
      });
      setState(
        Object.assign(
          {},
          { profile, isProfileOwner, isFollowing },
          { profile: updatedProfile }
        )
      );
      toast.success({
        title: 'success',
        message: 'Profile updated',
      });
      setTimeout(() => dialog.hide(), 500);
    } catch (error) {
      toast.error({
        title: 'error',
        message: 'Failed to edit profile',
      });
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      setUpdatingProfile(true);
      await ProfileService.follow(userId);
      setState(
        Object.assign(
          {},
          { profile, isProfileOwner, isFollowing },
          { isFollowing: true }
        )
      );
      toast.success({
        title: 'success',
        message: 'User followed',
      });
    } catch (error) {
      toast.error({
        title: 'error',
        message: 'Failed to follow user',
      });
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    try {
      setUpdatingProfile(true);
      await ProfileService.unfollow(userId);
      setState(
        Object.assign(
          {},
          { profile, isProfileOwner, isFollowing },
          { isFollowing: false }
        )
      );
      toast.success({
        title: 'success',
        message: 'User unfollowed',
      });
    } catch (error) {
      toast.error({
        title: 'error',
        message: 'Failed to unfollow user',
      });
    } finally {
      setUpdatingProfile(false);
    }
  };

  if (profileLoading || loading) {
    return (
      <Flex sx={styles.wholeContainerCss}>
        <Spinner sx={styles.spinnerCss} />
      </Flex>
    );
  }

  if (!profile || profile === {}) {
    return (
      <Flex sx={styles.wholeContainerCss}>
        <Text variant="hero">404 Profile Not Found</Text>
      </Flex>
    );
  }

  return (
    <Flex sx={styles.wholeContainerCss}>
      <Flex sx={styles.topContainerCss}>
        <Flex sx={styles.lhsCss}>
          <Box sx={styles.avatarContainerCss}>
            <Avatar src={profile.avatar} sx={styles.avatarCss} />
          </Box>
          {!isProfileOwner && (
            <React.Fragment>
              <CustomButton
                variant="solid"
                onClick={isFollowing ? handleUnfollow : handleFollow}
                isLoading={updatingProfile}
                sx={{ px: 'md', py: 'xs' }}
              >
                <Text variant="subtitle">
                  {isFollowing ? 'unfollow' : 'follow'}
                </Text>
              </CustomButton>
            </React.Fragment>
          )}
          {isProfileOwner && (
            <React.Fragment>
              <DialogDisclosure {...dialog} sx={styles.editProfileBtnCss()}>
                <Text variant="subtitle" sx={styles.editBtnTextCss}>
                  Edit Profile
                </Text>
              </DialogDisclosure>
              <Dialog
                {...dialog}
                sx={styles.editProfileModalCss}
                aria-label="Edit Profile Form"
              >
                <Text variant="heading">Edit Profile</Text>
                <form onSubmit={handleEditProfile}>
                  <InputGroup
                    label="Biography"
                    name="biography"
                    id="biography"
                    type="text"
                    variant="multi-line"
                    defaultValue={profile.biography}
                  />
                  <InputGroup
                    label="Contact Number"
                    name="phoneNumber"
                    id="phoneNumber"
                    type="text"
                    defaultValue={profile.phoneNumber}
                  />
                  <CustomButton
                    variant="solid"
                    sx={styles.submitProfileBtnCss}
                    isLoading={updatingProfile}
                  >
                    <Text variant="default">submit</Text>
                  </CustomButton>
                </form>
              </Dialog>
            </React.Fragment>
          )}
        </Flex>
        <Flex sx={styles.rhsCss}>
          <Text variant="heading" sx={styles.usernameCss}>
            {profile.user.username}
          </Text>
          <Flex>
            <Text variant="subtitle" sx={styles.counterCss}>
              {eventCount} {eventCount === 1 ? 'event' : 'events'}
            </Text>
            <Text variant="subtitle" sx={styles.counterCss}>
              {profile.follows.length} following
            </Text>
          </Flex>
          {isProfileOwner && (
            <Text variant="default">Contact Number: {profile.phoneNumber}</Text>
          )}
          <Text variant="default" sx={styles.bioCss}>
            {profile.biography}
          </Text>
        </Flex>
      </Flex>
      <Divider variant="solid" sx={styles.dividerCss} />
      <Box>
        <TabList {...tab}>
          <Tab
            {...tab}
            sx={styles.tabHeadingCss(tab.selectedId === 'liveEvents')}
            id="liveEvents"
          >
            <Text variant="heading" sx={{ fontSize: ['body', 'heading'] }}>
              Live Events
            </Text>
          </Tab>
          <Tab
            {...tab}
            sx={styles.tabHeadingCss(tab.selectedId === 'pastEvents')}
            id="pastEvents"
          >
            <Text variant="heading" sx={{ fontSize: ['body', 'heading'] }}>
              Past Events
            </Text>
          </Tab>
          <Tab
            {...tab}
            sx={styles.tabHeadingCss(tab.selectedId === 'followingUsers')}
            id="followingUsers"
          >
            <Text variant="heading" sx={{ fontSize: ['body', 'heading'] }}>
              Following Users
            </Text>
          </Tab>
        </TabList>
      </Box>
      <Box sx={{ width: ['100%', '80%', '50%'], textAlign: 'center', p: 'sm' }}>
        <TabPanel {...tab} sx={{ outline: 'none' }}>
          {featured.future.length > 0 || normal.future.length > 0 ? (
            <React.Fragment>
              <EventsList events={featured.future} />
              <EventsList events={normal.future} />
            </React.Fragment>
          ) : (
            <Text variant="default">
              looks like there's no live events here
            </Text>
          )}
        </TabPanel>
        <TabPanel {...tab} sx={{ outline: 'none' }}>
          {featured.past.length > 0 || normal.past.length > 0 ? (
            <React.Fragment>
              <EventsList events={featured.past} />
              <EventsList events={normal.past} />
            </React.Fragment>
          ) : (
            <Text variant="default">
              looks like there's no past events here
            </Text>
          )}
        </TabPanel>
        <TabPanel {...tab} sx={{ outline: 'none' }}>
          {profile.follows.length > 0 ? (
            <UserList users={profile.follows} />
          ) : (
            <Text variant="default">looks like there's no users here</Text>
          )}
        </TabPanel>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
