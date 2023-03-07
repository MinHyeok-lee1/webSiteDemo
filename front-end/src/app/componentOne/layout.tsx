import React from "react";
import ContextClickCounter from "../click-counter";
export const metadata = {
  title: "Client Context",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <ContextClickCounter />
    </div>
  );
}
