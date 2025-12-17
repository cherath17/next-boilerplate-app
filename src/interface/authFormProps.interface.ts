export interface AuthApiFormProps {
  email: string;
  name?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
  remember?: boolean;
  agree?: boolean;
}

export interface AuthFormProps {
  mode: "login" | "signup";
  type?: "password" | "otp"; // default password
  onSubmit?: (data: AuthApiFormProps) => void;
}

export type AuthFormFields = {
  email: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
  remember?: boolean;
  agree?: boolean;
};
