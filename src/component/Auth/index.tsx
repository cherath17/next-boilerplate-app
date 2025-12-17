import type React from "react";
import style from "@template/component/Auth/Auth.module.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useLogin } from "./useAuth";
import { useThemeContext } from "@template/context/ThemeContext";
import { useUserStore } from "@template/store/useUserStore";

const AuthModule: React.FC = () => {
  const { updation } = useUserStore();
  const { toastShow } = useThemeContext();

  const { formData, handleChange, handleSubmit, isMutating } = useLogin(
    toastShow,
    updation
  );

  return (
    <div className={style.main_container}>
      <div className={style.login_box}>
        <h2>Login</h2>
        <div className={style.form_group}>
          <label htmlFor="email">Email</label>
          <InputText
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className={style.form_group}>
          <label htmlFor="password">Password</label>
          <InputText
            type="password"
            name="password"
            value={formData?.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <Button
          loading={isMutating}
          onClick={(e) => handleSubmit(e)}
          label="Submit"
        />
      </div>
    </div>
  );
};

export default AuthModule;
