import type { Metadata } from "next";
import "@fontsource/poppins";
import "./globals.css";


export const metadata: Metadata = {
  title: {
    default: "RedPill - Confidential AI",
    template: "%s | RedPill",
  },
  description: "",
  keywords: [
    "Confidential AI",
    "Private AI",
    "Trusted Execution Environment",
    "AI Gateway",
  ],
  authors: [{ name: "RedPill" }],
  creator: "RedPill",
  publisher: "RedPill",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
