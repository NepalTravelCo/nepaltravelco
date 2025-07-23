

import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import ScrollToTop from "@/footer-components/ScrollToTop";
import Navigation from "@/header-component/Navigation";
import FooterSection from "@/footer-components/FooterSection";
import BackToTopButton from "@/footer-components/BackToTopButton";
import BootstrapClientLoader from "./BootstrapClientLoader";

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
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&family=Poppins:wght@400;600&family=Quicksand:wght@300;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Bootstrap CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>

      <body>
        <BootstrapClientLoader />
        <ScrollToTop />
        <Navigation />

        {children}

        <FooterSection />
        <BackToTopButton />
      </body>
    </html>
  );
}

