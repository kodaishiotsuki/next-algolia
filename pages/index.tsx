import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import { Layout } from "../components/layout";
import { useAuth } from "../context/auth";
import styles from "../styles/Home.module.css";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>トップページ</p>
        <p>{user?.name}</p>
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
