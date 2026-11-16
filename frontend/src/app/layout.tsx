

// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";


import { inter, poppins } from "./fonts";

export const metadata: Metadata = {
  title: "Nepal Travel Co",
  description: "Discover Nepal with us",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/Images/Logo/logo-white.png?v=2" />
      </head>
      <body className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning={true}>

        {children}

      </body>
    </html>
  );
}
