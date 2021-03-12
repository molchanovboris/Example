import React, { FC, memo } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Input } from "antd";
import "./styles.scss";
import { ILoginParams } from "../../../interfaces/auth-interfaces";

const AuthForm: FC<IProps> = ({ onFinish }) => {
  const { register } = useForm<ILoginParams>({});

  const rulesLogin = {
    required: true,
    message: "Please input your login!",
    max: 10,
  };

  const rulesPassword = {
    required: true,
    message: "Please input your password!",
    min: 5,
    max: 20,
  };

  return (
    <Form
      className="form-auth"
      onFinish={onFinish}
      initialValues={{
        remember: true,
      }}
    >
      <h1 className="form-auth__head">Вход в систему</h1>
      <Form.Item name="login" rules={[rulesLogin]}>
        <Input.Group
          className="form-auth__input"
          ref={register}
          placeholder="Логин"
          type="text"
          id="login"
          name="login"
        />
      </Form.Item>
      <Form.Item name="password" rules={[rulesPassword]}>
        <Input.Password
          className="form-auth__input"
          ref={register}
          placeholder="Пароль"
          type="text"
          id="password"
          name="password"
        />
      </Form.Item>
      <Form.Item>
        <Button className="form-auth__button" type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

interface IProps {
  onFinish: (data: ILoginParams) => void;
}

export default memo(AuthForm);
