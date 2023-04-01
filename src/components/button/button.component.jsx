import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles";

export const BUTTON_TYPE = {
  base: "base",
  google: "google",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE.base) => {
  return {
    [BUTTON_TYPE.base]: BaseButton,
    [BUTTON_TYPE.google]: GoogleSignInButton,
    [BUTTON_TYPE.inverted]: InvertedButton,
  }[buttonType];
};

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);

  return <CustomButton {...otherProps}>{children}</CustomButton>;
};
export default Button;
