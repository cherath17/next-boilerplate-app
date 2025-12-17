//  Auth Modes
export enum AuthModeEnum {
  LOGIN = "login",
  SIGNUP = "signup",
  OTP = "otp",
  PASSWORD = "password",
}

export enum AuthType {
  DEFAULT = "default",
  OTP = "otp",
}

//  Auth UI Text
export enum AuthTextEnum {
  SIGN_UP_TITLE = "Sign Up",
  LOGIN_TITLE = "Login",
  OTP_LOGIN_TITLE = "OTP Login",

  DESC_SIGNUP = "Create a new account.",
  DESC_LOGIN = "Login to your account.",
  DESC_OTP_EMAIL = "Enter your email to receive an OTP.",
  DESC_OTP_VERIFY = "Enter the OTP sent to your email.",

  PASSWORD_NOT_MATCH = "Passwords do not match",
  OTP_SENT = "OTP sent to",

  BTN_SIGN_UP = "Sign Up",
  BTN_LOGIN = "Login",
  BTN_REQUEST_OTP = "Request OTP",
  BTN_VERIFY = "Verify",
  BTN_RESET = "Reset",

  PRIVACY_POLICY = "I agree with the Privacy Policy",
  REMEMBER_ME = "Remember me",
}

//  Field Labels
export enum FieldLabelsEnum {
  NAME = "Name",
  EMAIL = "Email",
  PASSWORD = "Password",
  CONFIRM_PASSWORD = "Confirm Password",
  OTP = "OTP",
}
