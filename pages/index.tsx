import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useAuth } from "../context/auth";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>{user?.name}</p>
      </main>
    </div>
  );
};

export default Home;
