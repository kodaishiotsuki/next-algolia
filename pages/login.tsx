import React, { ReactElement } from "react";
import Button from "../components/button";
import { Layout } from "../components/layout";
import { login, logout } from "../lib/auth";
import { NextPageWithLayout } from "./_app";

const LoginPage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>ログイン</h1>
      <Button onClick={login}>ログインする</Button>
      <Button onClick={logout}>ログアウト</Button>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default LoginPage;
