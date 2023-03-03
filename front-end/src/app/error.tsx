"use client";

import "../styles/globals.css";
import { useEffect } from "react";
import styles from "./breaking/breaking.module.css";

interface childrenProps {
  children: JSX.Element;
}

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={styles.error}>
      <div>ERRORQ!!!!</div>
      <p>Something went wrong!</p>
      <button onClick={() => reset()}>Reset error boundary</button>
    </div>
  );
}
