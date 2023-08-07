"use client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

/** It's going to work as a HOC */
const Provider = ({ children, session }: SessionProviderProps) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}

export default Provider;
