/** @jsx jsx */
import { Flex, Input, jsx, Label, Textarea } from 'theme-ui';
import {
  inputContainerCss,
  inputCss,
  inputGroupContainerCss,
  inputIconCss,
} from './index.styles';
import SvgIcon from '../svg-icon';

/**
 * Renders an input with a label
 * @param {object} sx theme-ui style object
 * @param {string} id input id
 * @param {string} label label text
 * @param {string} name input name
 * @param {string} type input type
 * @param {string} iconVariant variant of icon to display inside input
 * @param {any} value value of the input
 * @param {Function} onChange function to handle input change
 * @example
 * const [state, setState] = React.useState('')
 *
 * <InputGroup
 *  id="username"
 *  label="username"
 *  name="username"
 *  type="text"
 *  iconVariant="account-circle"
 *  value={state}
 *  onChange={(e) => setState(e.target.value)}
 * />
 */
const InputGroup = ({
  id,
  label,
  labelColor = 'text-dark',
  name,
  type,
  variant = 'single-line',
  iconVariant,
  value,
  onChange,
  sx,
  ...rest
}) => {
  return (
    <Flex sx={inputGroupContainerCss}>
      <Label htmlFor={id} sx={{ color: labelColor }}>
        {label}
      </Label>
      <div sx={inputContainerCss}>
        {variant === 'single-line' && (
          <Input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            sx={{ ...inputCss({ variant, iconVariant }), ...sx }}
            {...rest}
          />
        )}
        {variant === 'multi-line' && (
          <Textarea
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            sx={{ ...inputCss({ variant, iconVariant }), ...sx }}
            {...rest}
          />
        )}
        {iconVariant && <SvgIcon sx={inputIconCss} variant={iconVariant} />}
      </div>
    </Flex>
  );
};

export default InputGroup;
