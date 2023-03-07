import Head from "next/head";
import styles from "../styles/layout.module.css";

interface childrenProps {
  children: JSX.Element;
}

export default function Layout({ children }: childrenProps) {
  return (
    <html lang="en">
      <Head>
        <title>LOL</title>
      </Head>
      <body>
        <div className={styles.header}>From Layout</div>

        {children ?? <h1>Loading...</h1>}
      </body>
    </html>
  );
}
