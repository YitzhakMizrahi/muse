import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Muse",
  description:
    "Creative Direction Engine for shaping rough sparks into visual and verbal territories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
