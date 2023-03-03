import styles from "../styles/layout.module.css";

interface childrenProps {
  children: JSX.Element;
}

export default function Layout({ children }: childrenProps) {
  return (
    <html lang="en">
      <head>
        <title>LOL</title>
      </head>
      <body>
        <div className={styles.header}>From Layout</div>
        {children}
      </body>
    </html>
  );
}
