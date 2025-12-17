import { AuthForm } from "@/component/AuthV2";
import { AuthModeEnum } from "@/enum/auth.enum";
import { AuthLayout } from "@/Layout/authLayout";

const Signup: React.FC = () => {
  return (
    <AuthLayout>
      <AuthForm mode={AuthModeEnum.SIGNUP} />
    </AuthLayout>
  );
};

export default Signup;
