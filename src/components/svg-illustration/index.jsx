/** @jsx jsx */
import { jsx } from 'theme-ui';
import Illustrations from '../../assets/illustrations';

/**
 * Renders an SVG Illustration
 * @param {string} variant one of add-post, authentication,
 * date-picker, events, festivities, make-it-rain, online-ad
 * @example
 * <SvgIllustration variant="add-post" />
 */
const SvgIllustration = ({ variant, ...rest }) => {
  switch (variant) {
    case 'add-post':
      return <Illustrations.AddPost {...rest} />;
    case 'authentication':
      return <Illustrations.Authentication {...rest} />;
    case 'date-picker':
      return (
        <Illustrations.DatePicker height="218px" width="251px" {...rest} />
      );
    case 'events':
      return <Illustrations.Events {...rest} />;
    case 'festivities':
      return <Illustrations.Festivities {...rest} />;
    case 'make-it-rain':
      return (
        <Illustrations.MakeItRain height="231px" width="315px" {...rest} />
      );
    case 'online-ad':
      return <Illustrations.OnlineAd {...rest} />;
    case 'collaborate':
      return <Illustrations.Collaborate {...rest} />;
    case 'private-data':
      return <Illustrations.PrivateData {...rest} />;
    case 'profile':
      return <Illustrations.Profile {...rest} />;
    case 'team-up':
      return <Illustrations.TeamUp {...rest} />;
    case 'under-construction':
      return <Illustrations.UnderConstruction {...rest} />;
    default:
      throw new Error('You must specify an icon variant');
  }
};

export default SvgIllustration;
