import { AuthForm } from "@/component/AuthV2";
import { AuthModeEnum } from "@/enum/auth.enum";
import { AuthLayout } from "@/Layout/authLayout";
import type React from "react";

const Login: React.FC = () => {
  return (
    <AuthLayout>
      <AuthForm mode={AuthModeEnum.LOGIN} type={AuthModeEnum.PASSWORD} />
    </AuthLayout>
  );
};

export default Login;
