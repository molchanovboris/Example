import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { signIn } from "../../app/slices/auth-slice";
import { RootState } from "../../app/store";
import AuthForm from "./AuthForm";
import "./AuthForm/auth.scss";

const AuthPage: FC<TAuthPageProps> = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth);

  const handleAuth = useCallback(
    (data: TFormInput) => {
      dispatch(signIn(data));
      if (isAuthenticated) {
        return history.push("/main");
      }
    },
    [dispatch]
  );

  return (
    <div className="auth">
      <div className="auth__img"></div>
      <AuthForm onFinish={handleAuth} />
    </div>
  );
};

type TFormInput = {
  login: string;
  password: string;
};

type TAuthPageProps = RouteComponentProps;

export default withRouter(AuthPage);
