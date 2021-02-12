/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as ReactIcon from 'react-icons/md';

/**
 * Renders an icon component
 * @param {string} variant one of account-circle, alternate-email,
 * arrow-forward, event, group, local-offer, lock, place, schedule,
 * search, timer, update, add, attach-money
 * @example
 * <Icon variant="account-circle" />
 */
const SvgIcon = ({ variant, ...rest }) => {
  switch (variant) {
    case 'account-circle':
      return <ReactIcon.MdAccountCircle {...rest} />;
    case 'alternate-email':
      return <ReactIcon.MdEmail {...rest} />;
    case 'arrow-forward':
      return <ReactIcon.MdArrowForward {...rest} />;
    case 'event':
      return <ReactIcon.MdEvent {...rest} />;
    case 'group':
      return <ReactIcon.MdGroup {...rest} />;
    case 'local-offer':
      return <ReactIcon.MdLocalOffer {...rest} />;
    case 'lock':
      return <ReactIcon.MdLock {...rest} />;
    case 'place':
      return <ReactIcon.MdPlace {...rest} />;
    case 'schedule':
      return <ReactIcon.MdSchedule {...rest} />;
    case 'search':
      return <ReactIcon.MdSearch {...rest} />;
    case 'timer':
      return <ReactIcon.MdTimer {...rest} />;
    case 'update':
      return <ReactIcon.MdUpdate {...rest} />;
    case 'add':
      return <ReactIcon.MdAdd {...rest} />;
    case 'attach-money':
      return <ReactIcon.MdAttachMoney {...rest} />;
    case 'report-problem':
      return <ReactIcon.MdReportProblem {...rest} />;
    case 'info':
      return <ReactIcon.MdInfo {...rest} />;
    case 'check':
      return <ReactIcon.MdDone {...rest} />;
    default:
      throw new Error('You must specify an icon variant');
  }
};

export default SvgIcon;
